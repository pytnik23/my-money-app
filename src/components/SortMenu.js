import React from 'react';
import IconButton from 'material-ui/IconButton';
import SortIcon from 'material-ui-icons/Sort';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = {
    form: {
        margin: '1.2rem 1.5rem',
    },
};

class SortMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: this,
            open: false,
            sortValue: 'time',
            filterValue: 'all',
        };
    }

    openSortMenu = e => {
        this.setState({ open: true, anchorEl: e.currentTarget });
    }

    closeSortMenu = () => {
        this.setState({ open: false });
    }

    handleSort = (e, value) => {
        this.setState({ sortValue: value });
        this.props.sortTransactions(value);
    }

    handleFilter = (e, value) => {
        this.setState({ filterValue: value });
        this.props.filterTransactions(value);
    }

    render() {
        return (
            <div>
                <IconButton
                    onClick={this.openSortMenu}
                    color="contrast"
                    aria-label="Sort"
                >
                    <SortIcon />
                </IconButton>
                <Popover
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.closeSortMenu}
                >
                    <FormControl
                        component="fieldset"
                        className={this.props.classes.form}
                    >
                        <FormLabel
                            component="legend"
                            focused={false}
                        >
                            Sort by
                        </FormLabel>
                        <RadioGroup
                            aria-label="sort"
                            name="sort"
                            value={this.state.sortValue}
                            onChange={this.handleSort}
                        >
                            <FormControlLabel
                                value="time"
                                control={<Radio />}
                                label="Date"
                            />
                            <FormControlLabel
                                value="amount"
                                control={<Radio />}
                                label="Amount"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <FormControl
                        component="fieldset"
                        className={this.props.classes.form}
                    >
                        <FormLabel
                            component="legend"
                            focused={false}
                        >
                            Filter by
                        </FormLabel>
                        <RadioGroup
                            aria-label="filter"
                            name="filter"
                            value={this.state.filterValue}
                            onChange={this.handleFilter}
                        >
                            <FormControlLabel
                                value="all"
                                control={<Radio />}
                                label="All"
                            />
                            <FormControlLabel
                                value="incomes"
                                control={<Radio />}
                                label="Incomes"
                            />
                            <FormControlLabel
                                value="expenses"
                                control={<Radio />}
                                label="Expenses"
                            />
                        </RadioGroup>
                    </FormControl>
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles)(SortMenu);
