import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

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
  state = {
    open: false,
    headline: "",
    description: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = (e) => {
      e.preventDefault();
      this.handleClose();
      this.props.add_article(this.state.headline, this.state.description);
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
          <form className={classes.container} noValidate autoComplete="off">
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
