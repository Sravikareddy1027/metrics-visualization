import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { LinearProgress } from '@material-ui/core';
import { actions } from './dashboard/reducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);
const query = `{getMetrics}`;
export const MetricsSelector = (props) => {

    const classes = useStyles();
    const [selectedMet, setSelectedMet] = useState('-1');
    const dispatch = useDispatch();
    let { getMetrics } = useSelector((state: any) => state.dashboard);
    const [result] = useQuery({ query });
    const { fetching, data, error } = result;
    useEffect(() => {
        if (error) {
            dispatch(actions.dashboardApiErrorReceived({ error: error.message }));
            return;
        }
        if (!data) return;
        let { getMetrics } = data;
        dispatch(actions.metricsListDataRecevied({ getMetrics }));
    }, [dispatch, fetching, data, error]);
    useEffect(() => {
        dispatch(actions.UpdateSelectMetrics({ selectedItem: selectedMet }));
    }, [selectedMet]);
    if (fetching) return <LinearProgress />;
    return (
        <FormControl className={classes.formControl}>
            <NativeSelect
                value={selectedMet}
                onChange={(e) => { setSelectedMet(e.target.value); }}
                name="metrics"
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Metrics' }}
            >
                <option value="-1" disabled>Select Metrics</option>
                {getMetrics?.map((metric, indx) =>
                    (<option value={metric} key={indx + 'matrics'}>{metric}</option>))}
            </NativeSelect>
            {/* <FormHelperText>Select Metrics</FormHelperText> */}
        </FormControl>);
}