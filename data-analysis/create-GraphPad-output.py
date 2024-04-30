import pandas as pd
import json

# Load in data
df = pd.read_excel('clean_merged_data.xlsx', engine='openpyxl')
# Filter for specific quarter
winter24 = df.query("t1_quarter == 2")


scales = {"Agreement5-a": {"0.0": "Not applicable",
                           "1.0": "Strongly disagree",
                           "2.0": "Somewhat disagree",
                           "3.0": "Neutral",
                           "4.0": "Somewhat agree",
                           "5.0": "Strongly agree"}}


def get_proportions(data, column, key):
    proportions = round(data[column].value_counts(normalize=True, dropna=False) * 100, 2)
    formatted_list = [
        {key: (str(index) if str(index) != 'nan' else 'Missing'), "value": value}
        for index, value in proportions.items()
    ]
    return formatted_list


def item_group_proportions(data, items_dict, group_scale):
    group = "Item"
    proportions = []
    for item in items_dict.keys():
        value = items_dict[item]
        item_data = get_proportions(data, item, value)
        for entry in item_data:
            response_label = group_scale.get(entry[value], entry[value])
            response_dict = {group: value, "Response": response_label, "Value": entry['value']}
            proportions.append(response_dict)
    return proportions


def vega_lite_donut(data, description="A simple donut chart with embedded data.", inner_radius=70):
    """
    Create a Vega-Lite donut chart.

    Args:
    data (list of dicts): Data to be visualized
    description (str): Description of the chart.
    inner_radius (int): Inner radius of the donut chart to create a hole in the center.

    Returns:
    str: JSON string of the Vega-Lite specification.
    """
    first_key, first_value = next(iter(data[0].items()))
    field = first_key
    chart = {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "description": description,
          "width": 350,
          "height": 350,
          "title": {
            "text": "Race/Ethnicity + Gender",
            "fontSize": 25,
            "font": "Arial",
            "anchor": "start",
            "color": "black"
          },
          "data": {
            "values": data
          },
          "transform": [
            {
              "window": [{"op": "sum", "field": "value", "as": "total"}],
              "frame": ["null", "null"]
            },
            {
              "calculate": "datum.value / datum.total",
              "as": "percent"
            }
          ],
          "layer": [
            {
              "mark": {"type": "arc", "innerRadius": inner_radius},
              "encoding": {
                "theta": {
                  "field": "value",
                  "type": "quantitative"
                },
                "color": {
                  "field": "Race/Ethnicity + Gender",
                  "type": "nominal",
                  "scale": {
                    "domain": ["White and/or Asian Male", "URM"],
                    "range": ["#cccccc", "#1770ab"]
                  },
                  "legend": {
                    "orient": "top",
                    "title": "14 Responses",
                    "titleLimit": 0,
                    "titlePadding": 30,
                    "labelLimit": 0,
                    "symbolLimit": 0,
                    "labelFontSize": 16,
                    "titleFontSize": 16,
                    "offset": 40,
                    "direction": "vertical"
                  }
                }
              }
            },
            {
              "transform": [
                {"filter": "datum['Race/Ethnicity + Gender'] === 'URM'"}
              ],
              "mark": {"type": "text", "radiusOffset": 10, "fontSize": 55},
              "encoding": {
                "text": {
                  "field": "percent",
                  "type": "quantitative",
                  "format": ".1%"
                },
                "theta": {
                  "field": "value",
                  "type": "quantitative"
                },
                "color": {
                  "value": "black"
                }
              }
            }
          ],
          "config": {
            "legend": {
              "titlePadding": 10,
              "padding": 5,
              "labelFontSize": 12,
              "titleFontSize": 14
            }
          }
        }

    """chart = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": description,
        "data": {
            "values": data
        },
        "mark": {
            "type": "arc",
            "innerRadius": inner_radius
        },
        "encoding": {
            "theta": {"field": "value", "type": "quantitative"},
            "color": {"field": field, "type": "nominal"}
        }
    }"""
    return json.dumps(chart, indent=4)


def vega_lite_bar_chart(data, description="A detailed bar chart with embedded data."):
    """
    Create a Vega-Lite bar chart.

    Args:
    data (list of dicts): Data to be visualized
    description (str): Description of the chart.

    Returns:
    str: JSON string of the Vega-Lite specification.
    """
    chart = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": description,
        "data": {
            "values": data
        },
        "mark": "bar",
        "encoding": {
            "x": {"field": "Item"},
            "y": {"field": "Value", "type": "quantitative"},
            "xOffset": {"field": "Response"},
            "color": {
                "field": "Response",
                "type": "nominal",
                "scale": {
                    "domain": ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"],
                    "range": ["#FF0000", "#FFA500", "#FFFF00", "#32CD32", "#008000"]
                }
            },
            "order": {"field": "Response", "type": "ordinal"}
        }
    }
    return json.dumps(chart, indent=4)


race_data = get_proportions(winter24, 't1_RaceEthinicity_binary', "Race/Ethnicity")
race_donut = vega_lite_donut(race_data)
print(race_donut)







academic_outc_data = get_proportions(winter24, 't2_theme_emosupport', "I gave or received emotional support")
academic_outc_donut = vega_lite_donut(academic_outc_data)


academic_items = {'t2_theme_readingpresenting':'I enjoyed reading and presenting insights from my assigned paper',
                  't2_theme_discussions':'I enjoyed the weekly paper discussions',
                  't2_theme_gettoknow':'I got to know someone in a research lab I can ask questions of'}
academic_outc_data = item_group_proportions(winter24, academic_items, scales['Agreement5-a'])
chart_json = vega_lite_bar_chart(academic_outc_data)
