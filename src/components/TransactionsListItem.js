import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MoodIcon from 'material-ui-icons/Mood';
import LocalDiningIcon from 'material-ui-icons/LocalDining';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import ShoppingBasketIcon from 'material-ui-icons/ShoppingBasket';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';

const styles = {
    root: {
        marginTop: 0,
        right: 15,
        transform: 'translateY(-50%)',
    },
};

class TransactionsListItem extends React.Component {
    getData = (time) => {
        const minutesAgo = Math.floor((new Date() - new Date(time)) / (1000 * 60));

        if (minutesAgo > 60 * 24 * 2) {
            return `${Math.floor(minutesAgo / (60 * 24))} days ago`;
        } else if (minutesAgo > 60 * 24) {
            return 'Yesterday';
        } else if (minutesAgo > 60 * 2) {
            return `${Math.floor(minutesAgo / 60)} hours ago`;
        } else if (minutesAgo > 60) {
            return `An hour ago`;
        } else if (minutesAgo >= 2) {
            return `${minutesAgo} minutes ago`;
        } else if (minutesAgo >= 1) {
            return `${minutesAgo} minute ago`;
        } else {
            return 'Less then a minute ago';
        }
    }

    getAvatar = (category) => {
        let bgColor = '';
        let icon;

        switch (category) {
            case 'Fun':
                bgColor = 'orange';
                icon = <MoodIcon />;
                break;
            case 'Food':
                bgColor = 'deepskyblue';
                icon = <LocalDiningIcon />;
                break;
            case 'Purchases':
                bgColor = 'indianred';
                icon = <ShoppingCartIcon />;
                break;
            case 'Other':
                bgColor = 'gray';
                icon = <ShoppingBasketIcon />;
                break;
            default:
                bgColor = 'limegreen';
                icon = <AddIcon />;
                break;
        }

        return <Avatar style={{ backgroundColor: bgColor }}>{icon}</Avatar>;
    }

    render() {
        const {
            name,
            amount,
            category,
            isNegative,
            time
        } = this.props;

        return (
            <ListItem button>
                {this.getAvatar(category)}
                <ListItemText
                    primary={name}
                    secondary={this.getData(time)}
                />
                <ListItemSecondaryAction
                    className={this.props.classes.root}

                >
                    <span style={{ color: isNegative ? 'red' : 'limegreen' }}>
                        {
                            (isNegative ? '-' : '+') +
                            amount
                        }
                    </span>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default withStyles(styles)(TransactionsListItem);
