import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = {
    appBar: {
        position: 'relative',
    },
};

class DialogWrapper extends React.Component {

    handleRequestClose = () => {
        this.props.closeDialog();
    };

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                fullScreen
                open={this.props.open}
                onRequestClose={this.handleRequestClose}
                transition={<Slide direction="up" />}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="contrast"
                            onClick={this.handleRequestClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {this.props.children}
            </Dialog>
        );
    }
}

export default withStyles(styles)(DialogWrapper);
