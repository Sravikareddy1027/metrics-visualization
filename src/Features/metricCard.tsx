import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useQuery } from 'urql';
// import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            display: 'inline-block',
            margin: 10
        }
    }),
);

const query = ` 
query($input: String!) {
    getLastKnownMeasurement( metricName: $input ){
        value
    }
  }
`
export const MetricCard = ({ metric, changes, changes: { columns }, onClose }) => {

    const [cd, setCD] = useState([[0, 0]]);
    const classes = useStyles();
    const [result] = useQuery({
        query,
        variables: {
            input: metric,
        },
    });
    const { fetching, data, error } = result;
    useEffect(() => {
        console.log(fetching, data, error, columns);
        let filteredDt = columns?.filter(dt => dt[0] === metric);
        setCD(filteredDt);
    },[changes]);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">{metric} </Typography>
                {/* <Button onClick={(e) => { onClose() }}>X</Button> */}
            </CardContent>
            <CardActions>
                <Typography variant="h5" component="h2">{cd[0] && cd[0][1]}</Typography>
                {/* {data?.getLastKnownMeasurement?.value}  */}
            </CardActions>
        </Card>

    );
}