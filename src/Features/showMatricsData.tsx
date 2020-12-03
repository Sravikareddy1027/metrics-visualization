import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'urql';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import { MetricCard } from './metricCard';

const query = ` 
query($input: [MeasurementQuery]!) {
    getMultipleMeasurements(input:$input){
        metric
         measurements{           
            value
         }
    }
  }
`
// metric
// at
//unit
var interval = null;
export const ShowMetricsData = (props) => {
    clearInterval(interval);
    var [millis, setMillis] = useState(new Date());
    interval = setInterval(() => { setMillis(new Date()) }, 1350);
    var [gData, setGData] = useState({ columns: [] });

    let { selectedMetrics } = useSelector((state: any) => state.dashboard);

    let input = [];
    input = selectedMetrics.map((metricName) => { return { metricName, after: millis.getTime() - 360000 } })
    const [result] = useQuery({
        query,
        variables: {
            input,
        },
    });
    const { fetching, data, error } = result;


    useEffect(() => {
        // console.log(fetching, data, error);
        if (data) {
            // console.log(data?.getMultipleMeasurements,
            //     data?.getMultipleMeasurements[0]?.measurements[0]?.value);
            // console.log([...data?.getMultipleMeasurements?.map(met => { return met?.measurements?.map(itm => { return itm?.value }) })
            // ]);
            let mapedList = [...data?.getMultipleMeasurements?.map(met => { return [met.metric, ...met?.measurements?.map(itm => { return itm?.value })] })];
            if (mapedList && mapedList.length) {
                setGData({ ...gData, columns: mapedList });
            }
        }

    }, [millis]);

    let axis = {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d %H:%M:%S'
            }
        }
    }

    return (
        <div>
            {selectedMetrics?.map((metric, indx) => (
                <MetricCard metric={metric} key={indx + 'metrics-card'} changes={gData} />
            ))}
            {gData.columns.length ? <div id="chart">
                <C3Chart data={gData} />
            </div> : ''}
        </div>

    );
}