import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'fixed',
        bottom: 32,
        right: 32,
    },
});

class AddButton extends React.Component {

    handleClick = () => {
        this.props.openDialog('transaction');
    }

    render() {
        return (
            <Tooltip placement="top" title="Add Transaction">
                <Button
                    fab
                    color="accent"
                    className={this.props.classes.absolute}
                    onClick={this.handleClick}
                >
                    <AddIcon />
                </Button>
            </Tooltip>
        );
    }
}


export default withStyles(styles)(AddButton);
