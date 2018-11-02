import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';


import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import UploadImage from "./UploadImage";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CreateArticleDialog extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            headline: "",
            description: "",
            selectedFile: null
        };
        this.imageUpToParent = this.imageUpToParent.bind(this);
    }
    imageUpToParent = (param) => {
        this.setState({selectedFile: param});
    };

    handleClickOpen = () => {
        if (this.props.is_auth) {
            this.setState({open: true});
        } else {
            console.log('sx');
            return (<Redirect to="/login" />);
        }
    };

    handleClose = () => {
        this.setState({
            open: false,
            headline: "",
            description: "",
            selectedFile: null
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.handleClose();
        this.props.add_article(
            this.state.headline,
            this.state.description,
            this.state.selectedFile
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Create article</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Create new article
                            </Typography>
                            <Button color="inherit" onClick={this.onSubmit}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <form className={classes.container} noValidate autoComplete="off" >
                        <TextField
                            id="outlined-name"
                            label="Headline"
                            className={classes.textField}
                            placeholder="Enter headline here..."
                            margin="normal"
                            variant="outlined"
                            value={this.state.headline}
                            onChange={(e) => this.setState({headline: e.target.value})}
                        />
                        <TextField
                            id="outlined-full-width"
                            label="Description"
                            style={{ margin: 8 }}
                            placeholder="Enter description here..."
                            helperText="Full width!"
                            fullWidth
                            multiline
                            rows="10"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            value={this.state.description}
                            onChange={(e) => this.setState({description: e.target.value})}
                        />
                        <UploadImage imageUpToParent={this.imageUpToParent} />
                    </form>
                </Dialog>
            </div>
        );
    }
}

CreateArticleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateArticleDialog);
