import React from 'react';
import { withStyles } from 'material-ui/styles';
import NVD3Chart from 'react-nvd3';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 30,
    },
};

class Charts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            categoriesDatum: [],
            balanceDatum: [],
        };
    }

    componentWillMount = () => {
        this.getData(this.props.transactions);
    }

    getData = (arr) => {
        const categories = {};
        const categoriesDatum = [];
        const incomes = {key: 'Icomes', value: 0};
        const expenses = {key: 'Expenses', value: 0};

        arr.forEach(item => {
            if (item.category) {
                if (item.category in categories) {
                    categories[item.category]['value'] += item.amount;
                } else {
                    categories[item.category] = {key: item.category, value: item.amount};
                }
            }
            item.isNegative ? expenses.value += item.amount : incomes.value += item.amount;
        });

        for (let key in categories) {
            categoriesDatum.push(categories[key]);
        }

        this.setState({
            categoriesDatum,
            balanceDatum: [incomes, expenses],
        });
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div>
                <Paper>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Categories" />
                        <Tab label="Incomes / Expenses" />
                    </Tabs>
                </Paper>
                <div className={this.props.classes.container}>
                    { !this.state.value ? (
                        <NVD3Chart
                            type="pieChart"
                            datum={this.state.categoriesDatum}
                            labelType="percent"
                            x={d => d.key}
                            y={d => d.value}
                            height={500}
                            width={400}
                            duration={500}
                        />
                    ) : (
                        <NVD3Chart
                            type="pieChart"
                            datum={this.state.balanceDatum}
                            x={d => d.key}
                            y={d => d.value}
                            height={500}
                            width={400}
                            duration={500}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Charts);
