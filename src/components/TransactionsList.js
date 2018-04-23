import React from 'react';
import TransactionsListItem from './TransactionsListItem';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = {
    root: {
        margin: '56px auto 0',
        maxWidth: 700,
    },
};

class TransactionsList extends React.Component {

    render() {
        return (
            <List className={this.props.classes.root}>
                {!this.props.transactions.length ? (
                    'Please add items'
                ) : (
                    this.props.transactions.map((transaction) => {
                        return (
                            <TransactionsListItem
                                key={transaction.id}
                                {...transaction}
                            />
                        );
                    })

                )}
            </List>
        );
    }
}

export default withStyles(styles)(TransactionsList);
