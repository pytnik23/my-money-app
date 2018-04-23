import React from 'react';
import AppHeader from './AppHeader';
import AddButton from './AddButton';
import TransactionsList from './TransactionsList';
import TransactionForm from './TransactionForm';
import Charts from './Charts';
import DialogWrapper from './DialogWrapper';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            isDialogOpened: false,
            dialogChildren: '',
            filterBy: '',
        };
    }

    componentDidMount = () => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions'), (key, value) => {
            if (key === 'time') return new Date(value);
            if (key === 'amount') return +value;
            return value;
        });

        if (savedTransactions) {
            this.setState({ transactions: savedTransactions });
        }
    }

    saveToLocalStorage = () => {
        const transactions = JSON.stringify(this.state.transactions);

        localStorage.setItem('transactions', transactions);
    }

    openDialog = children => {
        this.setState({
            isDialogOpened: true,
            dialogChildren: children,
        });
    }

    closeDialog = () => {
        this.setState({ isDialogOpened: false });
    }

    getSum = (transactions) => {
        return transactions.reduce((sum, item) => {
            return item.isNegative ?  sum - item.amount : sum + +item.amount;
        }, 0);
    }

    addTransaction = (obj) => {
        obj.id = this.state.transactions.length;
        this.setState({
            transactions: [obj, ...this.state.transactions],
        }, this.saveToLocalStorage);
    }

    sortTransactions = (str) => {
        this.setState({
            transactions: this.state.transactions.sort((a, b) => {
                return b[str] - a[str];
            })
        });
    }

    filterTransactions = (str) => {
        this.setState({ filterBy: str });
    }

    render() {
        const filteredTransactions = this.state.transactions.filter((item) => {
            switch (this.state.filterBy) {
                case 'incomes':
                    return !item.isNegative;
                case 'expenses':
                    return item.isNegative;
                default:
                    return item;
            }
        });

        return (
            <div>
                <AppHeader
                    sortTransactions={this.sortTransactions}
                    filterTransactions={this.filterTransactions}
                    sum={this.getSum(filteredTransactions)}
                    openDialog={this.openDialog}
                />
                <TransactionsList
                    transactions={filteredTransactions}
                />
                <AddButton openDialog={this.openDialog} />
                <DialogWrapper
                    open={this.state.isDialogOpened}
                    closeDialog={this.closeDialog}
                >
                    {
                        this.state.dialogChildren === 'transaction' && (
                            <TransactionForm
                                handleSubmit={this.addTransaction}
                                closeDialog={this.closeDialog}
                            />
                        )
                    }
                    {
                        this.state.dialogChildren === 'charts' && (
                            <Charts
                                closeDialog={this.closeDialog}
                                transactions={this.state.transactions}
                            />
                        )
                    }
                </DialogWrapper>
            </div>
        );
    }
}


export default App;
