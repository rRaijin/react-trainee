import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    span: {
        marginLeft: 20,
    }
});

class UploadImage extends React.Component {

    state = {
        filename: ''
    };

    fileChangedHandler = (event) => {
        this.props.imageUpToParent(event.target.files[0]);
        this.setState({filename: event.target.files[0].name})
    };

    render() {
        const { classes } = this.props;
        return (
          <div>
              <input type="file"
                     onChange={this.fileChangedHandler}
                     ref={'file-upload'}
                     className={classes.input}
              />
              <Button onClick={e => {
                this.refs['file-upload'].click()
              }} className={classes.button} >
                  Upload
              </Button>
              <span className={classes.span}>
                  { this.props.initial_img_name ? this.props.initial_img_name : this.state.filename }
              </span>
          </div>
        );
    }
}

export default withStyles(styles)(UploadImage);
