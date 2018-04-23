import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DoneIcon from 'material-ui-icons/Done';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui-icons/Remove';
import AddIcon from 'material-ui-icons/Add';

const CATEGORIES = ['Fun', 'Food', 'Purchases', 'Other'];

const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 700,
        maxWidth: '100%',
        alignSelf: 'center',
    },
    textField: {
        flex: '1 0 300px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    categoryField: {
        width: '100%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    iconButton: {
        alignSelf: 'flex-end',
    },
    submitButtonWrapper: {
        width: '100%',
        margin: theme.spacing.unit,
        textAlign: 'right',
    },
});

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            name: '',
            category: 'Other',
            isNegative: true,
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.amount) {
            const {
                amount,
                name,
                category,
                isNegative,
                time = new Date(),
            } = this.state;

            if (!isNegative) {
                this.props.handleSubmit({ amount: +amount, name, isNegative, time });
            } else {
                this.props.handleSubmit({ amount: +amount, name, category, isNegative, time });
            }

            this.props.closeDialog();
        }
    }

    handleClick = () => {
        this.setState({ isNegative: !this.state.isNegative });
    }

    render() {
        const { classes } = this.props;

        return (
            <form
                className={classes.form}
                autoComplete="off"
                onSubmit={this.handleSubmit}
            >
                <IconButton
                    className={classes.iconButton}
                    onClick={this.handleClick}
                >
                    {
                        this.state.isNegative ? (
                            <RemoveIcon />
                        ) : (
                            <AddIcon />
                        )

                    }
                </IconButton>
                <TextField
                    name="amount"
                    label="Amount"
                    value={this.state.amount}
                    onChange={this.handleChange('amount')}
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    autoFocus={true}
                    required
                />
                <TextField
                    name="name"
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    type="text"
                    className={classes.textField}
                    margin="normal"
                />
                {this.state.isNegative &&
                    <TextField
                        name="category"
                        select
                        label="Category"
                        className={classes.categoryField}
                        value={this.state.category}
                        onChange={this.handleChange('category')}
                        SelectProps={{
                            native: true,
                        }}
                        margin="normal"
                    >
                        {CATEGORIES.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                }
                <div className={classes.submitButtonWrapper}>
                    <Button
                        fab
                        color="accent"
                        type="submit"
                    >
                        <DoneIcon />
                    </Button>
                </div>
            </form>
        );
    }
}


export default withStyles(styles)(TransactionForm);
