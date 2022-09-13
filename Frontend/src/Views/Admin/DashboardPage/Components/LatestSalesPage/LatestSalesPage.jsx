import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    withStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import styles from './Styles'
import { test_data, chartOptions } from './Chart/Chart'

const LatestSalesPage = (props) => {
    const { classes, className } = props;
    const rootClassName = classNames(classes.root, className);

    return (<>
        <Card className={rootClassName}>
            <CardHeader
                action={
                    <Button size="small" variant="text">
                        Last 7 days <ArrowDropDownIcon />
                    </Button>
                }
                title="Latest Sales"
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Bar
                        data={test_data}
                    // options={chartOptions}
                    />
                </div>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <Button color="primary" size="small" variant="text">
                    Overview <ArrowRightIcon />
                </Button>
            </CardActions>
        </Card>
    </>)

}

LatestSalesPage.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(LatestSalesPage);