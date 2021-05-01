import React from "react";
import { useFetch } from "./hooks/useFetch";
import {scaleLinear, scaleBand } from "d3-scale";
import { extent, max, bin, median, rollups} from "d3-array";

const App = () => {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/ndemmel/474/react-parcel-test/data/pokedex_(Update_04.21).csv"
      );


    
     // rollups example:
     // rollup(athletes, v => v.length, d => d.sport)
     // rollup(data ur using, v => the metric u want, d => group by variable u want)
     // where v and d are arbitrary parameter names, could be anything
    const speedGroupByType = rollups(data, v => median(v, d => +d.speed), d => d.type_1)

        //array of median base stats matched to types
        const baseStatsByType = rollups(data, v => median(v, d => +d.total_points), d => d.type_1)

        //an array of just electric types
        onlyElecData = data.filter(function(d){ return d.type_1 == "Electric" }) 

        //an array of just fire types
        onlyFireData = data.filter(function(d){ return d.type_1 == "Fire" }) //this works!

        //count pokemon by type
        console.log("counting num of each type ever")
        const numOfEachType = rollups(data, v => +v.length, d => d.type_1);
        console.log(numOfEachType);

        const firetypecountbygen = rollups(onlyFireData, v => +v.length, d => d.generation);
        console.log(firetypecountbygen);

    const fullDataSlice = data.slice(0, 1044);

    const totalBaseStats = extent(fullDataSlice, (d) => {
        return +d.total_points;
    });

    const totalSpeedPoints = extent(fullDataSlice, (d) => {
        return +d.speed;
    });

    const totalHeight = extent(fullDataSlice, (d) => {
        return +d.height_m; //height in meters
    });

    const totalWeight = extent(fullDataSlice, (d) => {
        return +d.weight_kg;
    })


    console.log("Stats to see if this works:");
    console.log("Weight" + totalWeight);
    console.log(totalSpeedPoints);
    console.log(totalHeight);


    const viewHeight = 500;
    const viewWidth = 500;
    const size = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 3;
    const yScale = scaleLinear()
        .domain(totalBaseStats) //unit: base stat points
        .range([size - margin, size - 350]); //unit: pixels


        const yspeedScale = scaleLinear()
            .domain(totalSpeedPoints)
            .range(totalHeight);

    const firetypecountScale = scaleLinear()
        .domain(8)
        .range([5, 15]);


        //bin takes an array and returns a data structure w specific properties
    _bins = bin().thresholds(20); //.thresholds(20) hardcodes 20 bins. automatically made each bin span 50 base stat points each
    tmaxBins = _bins(
        fullDataSlice.map((d) => {
            return +d.total_points;
        })
    );

    speedBins = _bins( 
        fullDataSlice.map((d) => {
            return +d.speed;
        })
    );

    heightBins = _bins(
        fullDataSlice.map((d) => {
            return +d.height_m;
        })
    );


    const histogramLeftPadding = 20;
    const coolMargin = { top: 20, right: 20, bottom: 20, left: 20};

    const growthScale = scaleBand()
        .domain(data.map(d => d.growth_rate))
        .range([0, 500 - coolMargin.top - coolMargin.bottom]);

    const growthScaleX = scaleLinear()
        .domain([0, max(data, d => d.total_points)])
        .range([0, 500 - coolMargin.right - coolMargin.left]);

    const weightScale = scaleLinear()
        .domain([0, max(data, d => d.total_points)])
        .range([0, max(data, d => d.weight_kg)]);

        console.log("from hook", loading, data);
    return (
        <div>
            <h1>Exploratory Data Analysis, Assignment 2</h1>
            <h2>INFO 474, Spring 2021</h2>
            <p>{loading && "Loading data!"}</p>



            <h3>Base Stat Distribution Across All Pokemon</h3>
            <svg width={viewWidth} height={viewHeight} style={{border: "1px solid black"}}>
            <text x="275" y="11" style={{fontSize: 14, fontFamily: "Arial"}}>1125</text>
            <text x="275" y="135" style={{fontSize: 14, fontFamily: "Arial"}}>850</text>
                <text x="275" y="245" style={{fontSize: 14, fontFamily: "Arial"}}>600</text>
                <text x="275" y="355" style={{fontSize: 14, fontFamily: "Arial"}}>400</text>
                <text x="275" y="495" style={{fontSize: 14, fontFamily: "Arial"}}>180</text>
            {/* code below shows total base stat distribution */}
                {data.map((measurement, index) => {
                   return(
                    <line key={index} 
                    x1={500 / 2} 
                    y1={500 - measurement.total_points + 165}
                    x2={500 / 2 + 20}
                    y2={500 - measurement.total_points + 165}
                    stroke="black"
                    strokeOpacity="0.2"
                    />
                );
                })}

            </svg>
            <div>     
                <text x="275" y="485" style={{fontSize: 14, fontFamily: "Arial"}}>This graph shows how base stat totals are distributed among every unique <br></br>
                Pokemon species. Base stat totals are the sum of a Pokemon's base HP, Attack, <br></br>Defense, Speed, Special Attack, and Special Defense. These totals are
                 a simple <br></br>way of estimating how strong a Pokemon is. This graph shows that many Pokemon <br></br>tend to have base stat totals in the ~650 - 850 range.
                 A smaller number of Pokemon <br></br>have base stat totals of about 400.  </text>
            </div>




            <h3>Number of Pokemon by Primary Type</h3>
            <svg width={viewWidth} height={viewHeight} style={{border: "1px solid black"}}>
            {/* code below shows total base stat distribution */}
            {numOfEachType.map((measurement, index) => {
                return (
                    <rect
                    y={size - numOfEachType[index][1] - 50}
                    width="20"
                    height={numOfEachType[index][1]}
                    x= {index * 23 + 60}
                    fill="none"
                    stroke="black"
                    />
                );
            })}
                       <text x="45" y="445" style={{fontSize: 14, fontFamily: "Arial"}}>8</text>
                       <text x="40" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>60</text>
                       <text x="35" y="315" style={{fontSize: 14, fontFamily: "Arial"}}>134</text>
                       <text x="5" y="275" style={{fontSize: 14, fontFamily: "Arial"}}>Number of </text>
                       <text x="5" y="290" style={{fontSize: 14, fontFamily: "Arial"}}>Pokemon </text>


                       <text id="rot8this" x="60" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Grs</text>
            <text id="rot8this" x="86" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Fir</text>
            <text id="rot8this" x="108" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Wa</text>
            <text id="rot8this" x="130" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Bug</text>
            <text id="rot8this" x="152" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Nrm</text>
            <text id="rot8this" x="176" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Drk</text>
            <text id="rot8this" x="200" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Psn</text>
            <text id="rot8this" x="220" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Elec</text>
            <text id="rot8this" x="245" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Grn</text>
            <text id="rot8this" x="270" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Ice</text>
            <text id="rot8this" x="293" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Fai</text>
            <text id="rot8this" x="315" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>St</text>
            <text id="rot8this" x="333" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Fght</text>
            <text id="rot8this" x="360" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Psy</text>
            <text id="rot8this" x="383" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Ro</text>
            <text id="rot8this" x="405" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Gh</text>
            <text id="rot8this" x="430" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Drg</text>
            <text id="rot8this" x="457" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Fly</text>
            <text id="rot8this" x="230" y="490" style={{fontSize: 13, fontFamily: "Arial"}}>Primary Type</text>
            </svg>

            <div>
                <text>This bar chart shows the counts of Pokemon by their primary type. Pokemon <br></br>can have either
                    one or two types. A primary type refers to the Pokemon's <b>first</b> <br></br>listed type. Because only the first type is counted, 
                    Pokemon with two types are <br></br>only counted once. For example, Skorupi, the Scorpion Pokemon,
                     has the typing <br></br> Poison/Bug, while Venomoth, the Poison Moth Pokemon, has the typing<br></br> Bug/Poison. The visualization
                     counts Skorupi only as a Poison type, while <br></br> Venomoth is counted only as a Bug type. This graph shows
                    that Water, Normal, <br></br> and Grass are the most common primary types, while Flying and Fairy types are <br></br> the most rare. 
                </text>
            </div>





            <h3>Median Base Stats By Type</h3>
            <svg width={viewWidth} height={viewHeight} style={{border: "1px solid black"}}>
            <text id="rot8this" x="60" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Grs</text>
            <text id="rot8this" x="86" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Fir</text>
            <text id="rot8this" x="108" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Wa</text>
            <text id="rot8this" x="130" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Bug</text>
            <text id="rot8this" x="152" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Nrm</text>
            <text id="rot8this" x="176" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Drk</text>
            <text id="rot8this" x="200" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Psn</text>
            <text id="rot8this" x="220" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Elec</text>
            <text id="rot8this" x="245" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Grn</text>
            <text id="rot8this" x="270" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Ice</text>
            <text id="rot8this" x="293" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Fai</text>
            <text id="rot8this" x="315" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>St</text>
            <text id="rot8this" x="333" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Fght</text>
            <text id="rot8this" x="360" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Psy</text>
            <text id="rot8this" x="383" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Ro</text>
            <text id="rot8this" x="405" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Gh</text>
            <text id="rot8this" x="430" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Drg</text>
            <text id="rot8this" x="457" y="470" style={{fontSize: 11, fontFamily: "Arial"}}>Fly</text>
            <text id="rot8this" x="260" y="490" style={{fontSize: 13, fontFamily: "Arial"}}>Primary Type</text>

            <text x="40" y="440" style={{fontSize: 11, fontFamily: "Arial"}}>0</text>
            <text  x="37" y="340" style={{fontSize: 11, fontFamily: "Arial"}}>300</text>
            <text x="37" y="240" style={{fontSize: 11, fontFamily: "Arial"}}>400</text>
            <text  x="37" y="120" style={{fontSize: 11, fontFamily: "Arial"}}>500</text>
            <text  x="40" y="45" style={{fontSize: 11, fontFamily: "Arial"}}>600</text>
            <text id="rot8this" x="5" y="170" style={{fontSize: 12, fontFamily: "Arial"}}>Median Base</text>
            <text id="rot8this" x="5" y="182" style={{fontSize: 11, fontFamily: "Arial"}}>Stat Total</text>


            {baseStatsByType.map((measurement, index) => {
                return (
                    <rect
                    y={size - baseStatsByType[index][1] + 140}
                    width="20"
                    height={baseStatsByType[index][1] -200}
                    x= {index * 23 + 60}
                    fill="none"
                    stroke="black"
                    />
                );
            })}

                </svg>

            <div><text>This bar chart shows the median base stats of all Pokemon
                organized by their <br></br>primary type. The graph shows that the median of all Dragon
                type Pokemon's<br></br> base stats is more than any other type. Bug type Pokemon have the lowest <br></br>median
                base stat total out of any type. 
                  </text></div>



            <h3>Number of Fire Types by Generation</h3>
            <svg width={viewWidth} height={viewHeight} style={{border: "1px solid black"}}>
            {firetypecountbygen.map((measurement, index) => {
                return (
                    <rect
                    y={size - firetypecountbygen[index][1] - 200}
                    width="20"
                    height={firetypecountbygen[index][1] + 60}
                    x= {index * 25 + 150}
                    fill="none"
                    stroke="black"
                    />
                );
            })}
                <text x="155" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>1</text>
                <text x="181" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>2</text>
                <text x="206" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>3</text>
                <text x="231" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>4</text>
                <text x="256" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>5</text>
                <text x="281" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>6</text>
                <text x="306" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>7</text>
                <text x="332" y="380" style={{fontSize: 14, fontFamily: "Arial"}}>8</text>
                <text x="220" y="405" style={{fontSize: 14, fontFamily: "Arial"}}>Generation</text>

                <text x="10" y="300" style={{fontSize: 14, fontFamily: "Arial"}}>Number of </text>
                <text x="10" y="315" style={{fontSize: 14, fontFamily: "Arial"}}>New Fire Types</text>
                <text x="130" y="287" style={{fontSize: 14, fontFamily: "Arial"}}>15</text>
                <text x="135" y="360" style={{fontSize: 14, fontFamily: "Arial"}}>0</text>

            </svg>
            <div><text>This bar chart shows the number of new Fire type Pokemon introduced in each 
                <br></br>generation of games. Generation 4 introduced the fewest number of new Fire
               <br></br> types, while generation 1 had the highest. Throughout each generation of 
               games,<br></br> the number of new primary Fire types remains about the same.</text>
          </div>  








            <h3>HP Across All Pokemon</h3>
            <svg width={viewWidth} height={viewHeight} style={{border: "1px solid black"}}>
                <text x="270" y="50" style={{fontSize: 14, fontFamily: "Arial"}}>255</text>
                <text x="270" y="155" style={{fontSize: 14, fontFamily: "Arial"}}>195</text>
                <text x="270" y="270" style={{fontSize: 14, fontFamily: "Arial"}}>130</text>
                <text x="270" y="385" style={{fontSize: 14, fontFamily: "Arial"}}>65</text>
                <text x="270" y="499" style={{fontSize: 14, fontFamily: "Arial"}}>1</text>
            {/* code below shows hp distribution */}
                {data.map((measurement, index) => {
                   return(
                    <circle key={index} cx={250} cy={(size - measurement.hp) * 2 - 505} r="3"
                    fill="none" stroke="black" strokeOpacity="0.2"
                    />
                );
                })}

            </svg>

            <div><text style={{fontSize: 14, fontFamily: "Arial"}}>This graph shows how base HP is distributed among every unique
                Pokemon <br></br>species. Base HP generally indicates how many attacks a Pokemon can <br></br>withstand before it is defeated in battle. This graph shows that 
                many Pokemon <br></br>tend to have base HP stats in the ~50 - 100 range.  </text></div>





            <h3>Weight vs Total Base Stats</h3>
            <svg width={viewWidth} height={viewHeight + 10} style={{border: "1px solid black"}}>
            {/* code below shows total base stat distribution */}
                {data.map((measurement, index) => {
                   return(
                    <circle key={index} 
                    cx={500 - yScale(measurement.total_points)}
                    r="3"
                    cy={500 - weightScale(measurement.weight_kg) - 20}
                    color="black"
                    fillOpacity="0.2"
                    />
                );
                })}

            <text x="405" y="225" style={{fontSize: 14, fontFamily: "Arial"}}>Weight (kg)</text>
            <text x="370" y="485" style={{fontSize: 14, fontFamily: "Arial"}}>0.1</text>
            <text x="370" y="20" style={{fontSize: 14, fontFamily: "Arial"}}>1,000</text>
            <text x="370" y="350" style={{fontSize: 14, fontFamily: "Arial"}}>250</text>
            <text x="370" y="120" style={{fontSize: 14, fontFamily: "Arial"}}>750</text>
            <text x="370" y="225" style={{fontSize: 14, fontFamily: "Arial"}}>500</text>


            <text x="190" y="502" style={{fontSize: 14, fontFamily: "Arial"}}>Base Stat Total</text>
            <text x="5" y="495" style={{fontSize: 12, fontFamily: "Arial"}}>180</text>
            <text x="75" y="493" style={{fontSize: 12, fontFamily: "Arial"}}>400</text>
            <text x="160" y="493" style={{fontSize: 12, fontFamily: "Arial"}}>600</text>
            <text x="330" y="495" style={{fontSize: 12, fontFamily: "Arial"}}>1125</text>



            </svg>

            <div><text style={{fontSize: 14, fontFamily: "Arial"}}>This graph shows the relationship between a Pokemon's
            weigtht and the total <br></br>number of base stats it has. There appears to be a slight positive correlation<br></br>
            between weight and base stats. Most Pokemon tend to be under 125 kg. </text></div>


            <h3>Speed Stat Distribution</h3>
            <svg width={viewWidth + 50} height={viewHeight} style={{border: "1px solid black"}}>
                {speedBins.map((bin, index) => {
                    return (
                        <rect
                        y={size - 60 - bin.length * 3}
                        width="20"
                        height={bin.length * 3}
                        x={histogramLeftPadding + index * 21}
                        fill="none"
                        stroke="black"
                        />
                    );
                })}
                <text x="210" y="480" style={{fontSize: 12, fontFamily: "Arial"}}>Base Speed</text>
                <text x="15" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>0-10</text>
                <text x="58" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>20-30</text>
                <text x="100" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>40-50</text>
                <text x="142" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>60-70</text>
                <text x="184" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>80-90</text>
                <text x="220" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>100-110</text>
                <text x="260" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>120-130</text>
                <text x="300" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>140-150</text>
                <text x="350" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>160-170</text>
                <text x="390" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>180-190</text>
                <text x="435" y="455" style={{fontSize: 10, fontFamily: "Arial"}}>200-210</text>

                <text x="482" y="220" style={{fontSize: 12, fontFamily: "Arial"}}>Number of</text>
                <text x="482" y="230" style={{fontSize: 12, fontFamily: "Arial"}}>Occurences</text>
                <text x="470" y="35" style={{fontSize: 10, fontFamily: "Arial"}}>134</text>
                <text x="470" y="155" style={{fontSize: 10, fontFamily: "Arial"}}>90</text>
                <text x="470" y="260" style={{fontSize: 10, fontFamily: "Arial"}}>60</text>
                <text x="470" y="345" style={{fontSize: 10, fontFamily: "Arial"}}>30</text>
                <text x="470" y="440" style={{fontSize: 10, fontFamily: "Arial"}}>1</text>

            </svg>

               <div> <text>
                   This graph shows the distribution of base speed stats for all Pokemon. The speed stat <br></br> determines who 
                   acts first in a battle. The majority of Pokemon seem to have a base <br></br>speed stat ranging between 30 - 99. Organizing
                   the speed stat in bins of 10 points each, <br></br>more Pokemon have a speed between 60 and 69 than any other group. 
               </text>
               </div>



            <h3>Base Experience vs Catch Rate</h3>
            <svg width={viewWidth} height={viewHeight} style={{border: "1px solid black"}}>
                <text x="310" y="230" style={{fontSize: 14, fontFamily: "Arial"}}>Base Experience Yield</text>
                <text x="280" y="35" style={{fontSize: 14, fontFamily: "Arial"}}>635</text>
                <text x="280" y="140" style={{fontSize: 14, fontFamily: "Arial"}}>450</text>
                <text x="280" y="230" style={{fontSize: 14, fontFamily: "Arial"}}>300</text>
                <text x="280" y="330" style={{fontSize: 14, fontFamily: "Arial"}}>150</text>
                <text x="280" y="465" style={{fontSize: 14, fontFamily: "Arial"}}>36</text>
                <text x="110" y="500" style={{fontSize: 14, fontFamily: "Arial"}}>Catch Rate</text>
                <text x="0" y="485" style={{fontSize: 14, fontFamily: "Arial"}}>3</text>
                <text x="125" y="485" style={{fontSize: 14, fontFamily: "Arial"}}>125</text>
                <text x="250" y="485" style={{fontSize: 14, fontFamily: "Arial"}}>255</text>
            {/* code below shows total base stat distribution, get it to be BY HEIGHT.  */}
                {data.map((measurement, index) => {
                   return(
                    <circle key={index} cx={measurement.catch_rate} cy={size - measurement.base_experience - 40} r="3"
                    fill="none" stroke="black" strokeOpacity="0.3"
                    />
                );
                })}
            </svg>
            <div>
            <text>This graph shows the relationship between a Pokemon species' catch rate <br></br>and its base experience yield.
                Catch rate refers to how easy it is to catch a <br></br>certain species of Pokemon, where a higher number indicates
                that a certain <br></br>species is easier to catch. Base experience yield refers to how many experience <br></br> points
                you can gain from defeating a Pokemon of any species. Generally, the<br></br> higher the base experience yield, the stronger a species is considered
                to be. <br></br>This graph shows a negative correlation between catch rate and base experience <br></br> yield. Pokemon that are easier to catch
                tend to yield less experience points <br></br>when defeated in a battle.
            </text>
            </div>

        </div>
    );
};
 export default App;
