import pandas as pd
import json
from pprint import pprint
from collections import defaultdict

# Load in data
df = pd.read_excel('clean_merged_data.xlsx', engine='openpyxl')
# Filter for specific quarter
winter24 = df.query("t1_quarter == 2")


scales = {"Agreement5-a": {"0.0": "Not applicable",
                           "1.0": "Strongly disagree",
                           "2.0": "Somewhat disagree",
                           "3.0": "Neutral",
                           "4.0": "Somewhat agree",
                           "5.0": "Strongly agree"},
          "Agreement4-a": {"0.0": "Not applicable",
                           "1.0": "Strongly disagree",
                           "2.0": "Somewhat disagree",
                           "3.0": "Somewhat agree",
                           "4.0": "Strongly agree"},
          "Frequency5-a": {"0.0": "Never",
                           "1.0": "Hardly ever",
                           "2.0": "Sometimes",
                           "3.0": "Frequently",
                           "4.0": "Always"},
          "Pref4-a": {"1.0": "Please not this one!",
                      "2.0": "Not excited, but ok...",
                      "3.0": "This seems interesting",
                      "4.0": "Would love this!"}
          }

def get_palette(domain):
    scale_key = matchOptions2Scale(scales, domain)
    scale_palettes = {"Agreement5-a": {"Not applicable": "#b3b3b3",
                                       "Strongly disagree": "#d77217",
                                       "Somewhat disagree": "#fdb72a",
                                       "Neutral": "#fdf876",
                                       "Somewhat agree": "#6ac8fd",
                                       "Strongly agree": "#315bb6"},
                      "Agreement4-a": {"0.0": "Not applicable",
                                       "1.0": "Strongly disagree",
                                       "2.0": "Somewhat disagree",
                                       "3.0": "Somewhat agree",
                                       "4.0": "Strongly agree"},
                      "Frequency5-a": {"0.0": "Never",
                                       "1.0": "Hardly ever",
                                       "2.0": "Sometimes",
                                       "3.0": "Frequently",
                                       "4.0": "Always"},
                      "Pref4-a": {"Please not this one!": "#f1f9e8",
                                  "Not excited, but ok...": "#b9e3bf",
                                  "This seems interesting": "#7bcdc4",
                                  "Would love this!": "#315ab6"}}

    # Retrieve the specific scale dictionary using the scale key
    palette = scale_palettes.get(scale_key, {})
    extra_colors = [
        "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c",
        "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00",
        "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"
    ]  # List of unique extra colors
    # Assign unique colors to missing items
    color_index = 0
    for item in domain:
        if item not in palette:
            if item == "Missing":
                palette[item] = "#e7e7e7"
            else:
                palette[item] = extra_colors[color_index % len(extra_colors)]
                color_index += 1
    hex_code_list = [palette[item] for item in domain if item in palette]
    return [palette, hex_code_list]


def matchOptions2Scale(scales, survey_responses):
    survey_responses = set(response.lower() for response in survey_responses)
    max_overlap = 0
    best_scale = None
    for scale_key, responses in scales.items():
        # Convert the dictionary of responses to a set of response descriptions
        response_set = set(response.lower() for response in responses.values())
        # Calculate the overlap using set intersection
        overlap = len(survey_responses & response_set)
        if overlap > max_overlap:
            max_overlap = overlap
            best_scale = scale_key
    return best_scale


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
    item_response_counts = {}
    for item in items_dict.keys():
        value = items_dict[item]
        summary = get_proportions(data, item, value)
        item_data = summary[0]
        response_counts = summary[1]
        for entry in item_data:
            response_label = group_scale.get(entry[value], entry[value])
            response_dict = {group: value, "Response": response_label, "Value": entry['value']}
            proportions.append(response_dict)
        item_response_counts[value] = response_counts
    return [proportions, item_response_counts]


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
    palette_dict, palette = get_palette(domain)
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

def vega_lite_grouphstackbar(data):
    proportions, num_responses = data
    # Convert percentage values to decimal format
    for entry in proportions:
        entry['Value'] = round(entry['Value'] / 100.0, 2)
    response_options = {entry['Response'] for entry in proportions}
    response_scale_key = matchOptions2Scale(scales, response_options)
    response_scale = list(scales[response_scale_key].values())
    final_domain = list(response_options - set(response_scale)) + response_scale
    response_rank = {response: i for i, response in enumerate(final_domain)}
    grouped_data = defaultdict(list) # Group data by 'Item'
    for entry in proportions:
        grouped_data[entry['Item']].append(entry)
    sorted_data = [] # Sort each group and flatten the list
    for item, responses in grouped_data.items():
        sorted_responses = sorted(responses, key=lambda x: response_rank[x['Response']])
        sorted_data.extend(sorted_responses)
    proportions = sorted_data
    palette_dict, palette = get_palette(final_domain)
    chart = {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "description": "A horizontal group stacked bar chart",
          "height": 270,
          "width": 250,
          "title": {
            "text": "Student ERG preferences prior to taking the course",
            "fontSize": 50,
            "font": "Arial",
            "anchor": "start",
            "subtitle": f"{max(num_responses.values())} Responses",
            "subtitleFontSize": 35,
            "color": "black",
            "offset": 40
          },
          "data": {
            "values": proportions
          },
          "transform": [
            {
              "stack": "Value",
              "as": [
                "v1",
                "v2"
              ],
              "groupby": [
                "Item"
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
                "Item"
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
                  "field": "Item",
                  "type": "nominal",
                  "title": None,
                  "axis": {
                    "offset": 15,
                    "ticks": False,
                    "minExtent": 60,
                    "maxExtent": 60,
                    "domain": False,
                    "titleLimit": 0,
                    "labelLimit": 0,
                    "labelFontSize": 30
                  }
                },
                "color": {
                  "field": "Response",
                  "type": "nominal",
                  "title": f"{max(num_responses.values())} Responses",
                  "scale": {
                    "domain": final_domain,
                    "range": palette,
                    "type": "ordinal"
                  },
                  "legend": {
                    "symbolType": "circle",
                    "symbolSize": 400,
                    "orient": "right",
                    "titlePadding": 40,
                    "padding": 5,
                    "title": None,
                    "columnPadding": 0,
                    "labelFontSize": 30,
                    "titleFontSize": 35,
                    "labelLimit": 0,
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
                  "field": "Item",
                  "type": "nominal"
                },
                "text": {
                  "field": "Value",
                  "type": "quantitative",
                  "format": ".1%"
                },
                "color": {
                  "condition": {
                    "test": "datum.Value > 0.06",
                    "value": "black"
                  },
                  "value": None
                }
              }
            }
          ]
        }
    return json.dumps(chart, indent=4)


race_data = get_proportions(winter24,
                            't1_RaceEthinicity_binary',
                            "Race/Ethnicity")
race_donut = vega_lite_donut(race_data,
                             "Not represented")
#print(race_donut)


academic_items = {'t2_theme_readingpresenting':'I enjoyed reading and presenting insights from my assigned paper',
                  't2_theme_discussions':'I enjoyed the weekly paper discussions',
                  't2_theme_gettoknow':'I got to know someone in a research lab I can ask questions of'}
academic_outc_data = item_group_proportions(winter24, academic_items, scales['Agreement5-a'])
academic_outc_chart = vega_lite_grouphstackbar(academic_outc_data)
print(academic_outc_chart)

erg_items = {
    't1_erg1_pref': 'Brain-Inspired Neural Networks',
    't1_erg2_pref': 'Sustainable Sensor Networks',
    't1_erg3_pref': 'Explanatory AI for Autonomous Vehicles',
    't1_erg4_pref': 'Accessibility, Communities, & Technology',
    't1_erg5_pref': 'Testing Autonomous Vehicles',
    't1_erg6_pref': '3D Faces',
    't1_erg7_pref': 'Ed Tech',
    't1_erg8_pref': 'Users in Design',
    't1_erg9_pref': 'Aerial Robotics',
    't1_erg10_pref': 'Personal Informatics',
    't1_erg11_pref': 'Autonomous Security',
    't1_erg12_pref': 'Air Quality Environmental Justice'
}
erg_pref_data = item_group_proportions(winter24, erg_items, scales['Pref4-a'])
erg_pref_chart = vega_lite_grouphstackbar(erg_pref_data)
#print(erg_pref_chart)
