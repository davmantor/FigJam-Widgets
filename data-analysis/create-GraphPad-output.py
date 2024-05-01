import pandas as pd
import json
from pprint import pprint

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


def get_color_palette(num_categories):
    # Color palette to accommodate different numbers of categories
    full_palette = [
        "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c",
        "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00",
        "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"
    ]
    # Make sure there are enough colors by repeating the palette if more categories exist than colors
    if num_categories > len(full_palette):
        repeat_times = (num_categories // len(full_palette)) + 1
        full_palette = full_palette * repeat_times

    # Slice the palette according to the number of categories
    return full_palette[:num_categories]


def get_proportions(data, column, key):
    number_responses = data[column].value_counts(dropna=False).sum()
    proportions = round(data[column].value_counts(normalize=True, dropna=False) * 100, 2)
    formatted_list = [
        {key: (str(index) if str(index) != 'nan' else 'Missing'), "value": value}
        for index, value in proportions.items()
    ]
    return [formatted_list, number_responses]


def item_group_proportions(data, items_dict, group_scale):
    group = "Item"
    proportions = []
    for item in items_dict.keys():
        value = items_dict[item]
        summary = get_proportions(data, item, value)
        item_data = summary[0]
        item_response_counts = summary[1]
        for entry in item_data:
            response_label = group_scale.get(entry[value], entry[value])
            response_dict = {group: value, "Response": response_label, "Value": entry['value']}
            proportions.append(response_dict)
    return proportions


def vega_lite_donut(data, catFocus,
                    description="A simple donut chart with embedded data.",
                    inner_radius=110):
    """
    Create a Vega-Lite donut chart.

    Args:
    data (list of dicts): Data to be visualized
    catFocus (str): Category that the chart should focus on (for the % and blue color)
    description (str): Description of the chart.
    inner_radius (int): Inner radius of the donut chart to create a hole in the center.

    Returns:
    str: JSON string of the Vega-Lite specification.
    """
    proportions = data[0]
    num_responses = data[1]
    first_key, first_value = next(iter(proportions[0].items()))
    field = first_key
    domain = [item[field] for item in proportions]
    palette = get_color_palette(len(domain))
    chart = {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "description": "Some title for the graph",
          "width": 350,
          "height": 350,
          "title": {
              "text": field,
              "subtitle": f"{num_responses} Responses",
              "fontSize": 25,
              "subtitleFontSize": 16,
              "font": "Arial",
              "anchor": "start",
              "color": "black",
              "offset": 20
          },
          "data": {
              "values": proportions
          },
          "transform": [
              {
                  "window": [
                      {
                          "op": "sum",
                          "field": "value",
                          "as": "total"
                      }
                  ],
                  "frame": [
                      None,
                      None
                  ]
              },
              {
                  "calculate": "datum.value / datum.total",
                  "as": "percent"
              }
          ],
          "layer": [
              {
                  "mark": {
                      "type": "arc",
                      "innerRadius": inner_radius
                  },
                  "encoding": {
                      "theta": {
                          "field": "value",
                          "type": "quantitative"
                      },
                      "color": {
                          "field": field,
                          "type": "nominal",
                          "scale": {
                              "domain": domain,
                              "range": palette
                          },
                          "legend": {
                              "orient": "bottom",
                              "title": None,
                              "titleLimit": 0,
                              "titlePadding": 30,
                              "labelLimit": 0,
                              "symbolLimit": 0,
                              "labelFontSize": 16,
                              "titleFontSize": 16,
                              "offset": 20,
                              "direction": "vertical"
                          }
                      }
                  }
              },
              {
                  "transform": [
                      {
                          "filter": f"datum['{field}'] === '{catFocus}'"
                      }
                  ],
                  "mark": {
                      "type": "text",
                      "radiusOffset": 10,
                      "fontSize": 55
                  },
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
    return json.dumps(chart, indent=4)

def vega_lite_hstackbar(data):
    proportions = data[0]
    num_responses = data[1]
    #pprint(proportions)
    chart = {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "description": "A diverging stacked bar chart for sentiments towards a set of eight questions, displayed as percentages with neutral responses straddling the 0% mark",
          "height": 270,
          "width": 250,
          "title": {
            "text": "Student ERG preferences prior to taking the course",
            "fontSize": 50,
            "font": "Arial",
            "anchor": "center",
            "color": "black",
            "offset": 40
          },
          "data": {
            "values": [
              {
                "question": "Brain Inspired Neural Networks",
                "type": "Strongly Disagree",
                "value": 24,
                "percentage": 0.007
              },
              {
                "question": "Brain Inspired Neural Networks",
                "type": "Disagree",
                "value": 294,
                "percentage": 0.091
              },
              {
                "question": "Brain Inspired Neural Networks",
                "type": "Neither Agree nor Disagree",
                "value": 594,
                "percentage": 0.185
              },
              {
                "question": "Brain Inspired Neural Networks",
                "type": "Agree",
                "value": 1927,
                "percentage": 0.599
              },
              {
                "question": "Brain Inspired Neural Networks",
                "type": "Strongly Agree",
                "value": 376,
                "percentage": 0.117
              },
              {
                "question": "Question 2",
                "type": "Strongly Disagree",
                "value": 2,
                "percentage": 0.182
              },
              {
                "question": "Question 2",
                "type": "Disagree",
                "value": 2,
                "percentage": 0.182
              },
              {
                "question": "Question 2",
                "type": "Neither Agree nor Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 2",
                "type": "Agree",
                "value": 7,
                "percentage": 0.636
              },
              {
                "question": "Question 2",
                "type": "Strongly Agree",
                "value": 11,
                "percentage": 0
              },
              {
                "question": "Question 3",
                "type": "Strongly Disagree",
                "value": 2,
                "percentage": 0.2
              },
              {
                "question": "Question 3",
                "type": "Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 3",
                "type": "Neither Agree nor Disagree",
                "value": 2,
                "percentage": 0.2
              },
              {
                "question": "Question 3",
                "type": "Agree",
                "value": 4,
                "percentage": 0.4
              },
              {
                "question": "Question 3",
                "type": "Strongly Agree",
                "value": 2,
                "percentage": 0.2
              },
              {
                "question": "Question 4",
                "type": "Strongly Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 4",
                "type": "Disagree",
                "value": 2,
                "percentage": 0.125
              },
              {
                "question": "Question 4",
                "type": "Neither Agree nor Disagree",
                "value": 1,
                "percentage": 0.063
              },
              {
                "question": "Question 4",
                "type": "Agree",
                "value": 7,
                "percentage": 0.438
              },
              {
                "question": "Question 4",
                "type": "Strongly Agree",
                "value": 6,
                "percentage": 0.375
              },
              {
                "question": "Question 5",
                "type": "Strongly Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 5",
                "type": "Disagree",
                "value": 1,
                "percentage": 0.042
              },
              {
                "question": "Question 5",
                "type": "Neither Agree nor Disagree",
                "value": 3,
                "percentage": 0.125
              },
              {
                "question": "Question 5",
                "type": "Agree",
                "value": 16,
                "percentage": 0.667
              },
              {
                "question": "Question 5",
                "type": "Strongly Agree",
                "value": 4,
                "percentage": 0.167
              },
              {
                "question": "Question 6",
                "type": "Strongly Disagree",
                "value": 1,
                "percentage": 0.063
              },
              {
                "question": "Question 6",
                "type": "Disagree",
                "value": 1,
                "percentage": 0.063
              },
              {
                "question": "Question 6",
                "type": "Neither Agree nor Disagree",
                "value": 2,
                "percentage": 0.125
              },
              {
                "question": "Question 6",
                "type": "Agree",
                "value": 9,
                "percentage": 0.563
              },
              {
                "question": "Question 6",
                "type": "Strongly Agree",
                "value": 3,
                "percentage": 0.188
              },
              {
                "question": "Question 7",
                "type": "Strongly Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 7",
                "type": "Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 7",
                "type": "Neither Agree nor Disagree",
                "value": 1,
                "percentage": 0.2
              },
              {
                "question": "Question 7",
                "type": "Agree",
                "value": 4,
                "percentage": 0.8
              },
              {
                "question": "Question 7",
                "type": "Strongly Agree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 8",
                "type": "Strongly Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 8",
                "type": "Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 8",
                "type": "Neither Agree nor Disagree",
                "value": 1,
                "percentage": 0.2
              },
              {
                "question": "Question 8",
                "type": "Agree",
                "value": 4,
                "percentage": 0.8
              },
              {
                "question": "Question 8",
                "type": "Strongly Agree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 9",
                "type": "Strongly Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 9",
                "type": "Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 9",
                "type": "Neither Agree nor Disagree",
                "value": 1,
                "percentage": 0.2
              },
              {
                "question": "Question 9",
                "type": "Agree",
                "value": 4,
                "percentage": 0.8
              },
              {
                "question": "Question 9",
                "type": "Strongly Agree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 10",
                "type": "Strongly Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 10",
                "type": "Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 10",
                "type": "Neither Agree nor Disagree",
                "value": 1,
                "percentage": 0.2
              },
              {
                "question": "Question 10",
                "type": "Agree",
                "value": 4,
                "percentage": 0.8
              },
              {
                "question": "Question 10",
                "type": "Strongly Agree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 11",
                "type": "Strongly Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 11",
                "type": "Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 11",
                "type": "Neither Agree nor Disagree",
                "value": 1,
                "percentage": 0.2
              },
              {
                "question": "Question 11",
                "type": "Agree",
                "value": 4,
                "percentage": 0.8
              },
              {
                "question": "Question 11",
                "type": "Strongly Agree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 12",
                "type": "Strongly Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 12",
                "type": "Disagree",
                "value": 0,
                "percentage": 0
              },
              {
                "question": "Question 12",
                "type": "Neither Agree nor Disagree",
                "value": 1,
                "percentage": 0.2
              },
              {
                "question": "Question 12",
                "type": "Agree",
                "value": 4,
                "percentage": 0.8
              },
              {
                "question": "Question 12",
                "type": "Strongly Agree",
                "value": 0,
                "percentage": 0
              }
            ]
          },
          "transform": [
            {
              "stack": "percentage",
              "as": [
                "v1",
                "v2"
              ],
              "groupby": [
                "question"
              ]
            },
            {
              "joinaggregate": [
                {
                  "field": "signed_percentage",
                  "op": "sum",
                  "as": "offset"
                }
              ],
              "groupby": [
                "question"
              ]
            },
            {
              "calculate": "datum.v1 - datum.offset",
              "as": "nx"
            },
            {
              "calculate": "datum.v2 - datum.offset",
              "as": "nx2"
            },
            {
              "calculate": "(datum.nx + datum.nx2) / 2",
              "as": "midPoint"
            }
          ],
          "layer": [
            {
              "mark": {
                "type": "bar",
                "stroke": None
              },
              "encoding": {
                "x": {
                  "field": "nx",
                  "type": "quantitative",
                  "title": "Percentage",
                  "axis": None
                },
                "x2": {
                  "field": "nx2"
                },
                "y": {
                  "field": "question",
                  "type": "nominal",
                  "title": None,
                  "axis": {
                    "offset": 10,
                    "ticks": False,
                    "minExtent": 60,
                    "domain": False,
                    "titleLimit": 0,
                    "labelLimit": 0,
                    "labelFontSize": 30
                  }
                },
                "color": {
                  "field": "type",
                  "type": "nominal",
                  "title": "12 Responses",
                  "scale": {
                    "domain": [
                      "Strongly Disagree",
                      "Disagree",
                      "Neither Agree nor Disagree",
                      "Agree",
                      "Strongly Agree"
                    ],
                    "range": [
                      "#c30d24",
                      "#f3a583",
                      "#cccccc",
                      "#94c6da",
                      "#1770ab"
                    ],
                    "type": "ordinal"
                  },
                  "legend": {
                    "symbolType": "circle",
                    "symbolSize": 200,
                    "orient": "right",
                    "titlePadding": 40,
                    "padding": 5,
                    "columnPadding": 0,
                    "labelFontSize": 30,
                    "titleFontSize": 35,
                    "labelLimit": 0,
                    "titleLimit": 0,
                    "symbolLimit": 0,
                    "offset": 20
                  }
                }
              }
            },
            {
              "mark": {
                "type": "text",
                "align": "center",
                "baseline": "middle",
                "fontSize": 25
              },
              "encoding": {
                "x": {
                  "field": "midPoint",
                  "type": "quantitative",
                  "scale": {
                    "domain": [
                      0,
                      1
                    ]
                  }
                },
                "y": {
                  "field": "question",
                  "type": "nominal"
                },
                "text": {
                  "field": "percentage",
                  "type": "quantitative",
                  "format": ".1%"
                },
                "color": {
                  "condition": {
                    "test": "datum.percentage > 0.04",
                    "value": "black"
                  },
                  "value": None
                }
              }
            }
          ]
        }
    return json.dumps(chart, indent=4)


"""
academic_items = {'t2_theme_readingpresenting':'I enjoyed reading and presenting insights from my assigned paper',
                  't2_theme_discussions':'I enjoyed the weekly paper discussions',
                  't2_theme_gettoknow':'I got to know someone in a research lab I can ask questions of'}
academic_outc_data = item_group_proportions(winter24, academic_items, scales['Agreement5-a'])"""


race_data = get_proportions(winter24,
                            't1_RaceEthinicity_binary',
                            "Race/Ethnicity")
race_donut = vega_lite_donut(race_data,
                             "Not represented")
print(race_donut)


academic_outc_data = get_proportions(winter24,
                                     't2_theme_emosupport',
                                     "I gave or received emotional support")
vega_lite_hstackbar(academic_outc_data)