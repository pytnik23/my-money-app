import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import PieChartIcon from 'material-ui-icons/PieChart';
import { withStyles } from 'material-ui/styles';
import SortMenu from './SortMenu';

const styles = {
    sum: {
        flex: '1 0',
        textAlign: 'center',
    },
};

class AppHeader extends React.Component {
    handleClick = () => {
        this.props.openDialog('charts');
    }

    render() {
        return (
            <AppBar>
                <Toolbar>
                    <SortMenu
                        sortTransactions={this.props.sortTransactions}
                        filterTransactions={this.props.filterTransactions}
                    />
                    <Typography
                        type="headline"
                        color="inherit"
                        className={this.props.classes.sum}
                    >
                        {this.props.sum}
                    </Typography>
                    <IconButton
                        color="contrast"
                        aria-label="Charts"
                        onClick={this.handleClick}
                    >
                        <PieChartIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(AppHeader);
