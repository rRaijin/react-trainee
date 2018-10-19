import React, { Component } from 'react';
import {connect} from 'react-redux';

import {notes} from "../actions";


class Note extends Component {
  state = {
    text: "",
    updateNoteId: null,
  };

  componentDidMount() {
    if (!this.props.notes || this.props.notes.length === 0) {
            this.props.fetchNotes()
    }
  };

  resetForm = () => {
    this.setState({text: "", updateNoteId: null});
  };

  selectForEdit = (id) => {
    let note = this.props.notes[id];
    this.setState({text: note.text, updateNoteId: id});
  };

  submitNote = (e) => {
    e.preventDefault();
    if (this.state.updateNoteId === null) {
      this.props.addNote(this.state.text);
    } else {
      this.props.updateNote(this.state.updateNoteId, this.state.text).then(this.resetForm);
    }
    this.resetForm();
  };

  render() {
    console.log('props', this.props);
    console.log('state', this.state);
    return (
      <div>
        <h3>My notes</h3>
        <hr />
        <table>
          <tbody>
            {this.props.notes.map((note, id) => (
              <tr key={`note_${id}`}>
                <td>{note.text}</td>
                <td><span onClick={() => this.selectForEdit(id)}>[E]</span></td>
                <td><span onClick={() => this.props.deleteNote(id)}>[X]</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Add new note</h3>
        <form onSubmit={this.submitNote}>
          <input
            value={this.state.text}
            placeholder="Enter note here..."
            onChange={(e) => this.setState({text: e.target.value})}
            required />
          <input type="submit" value="Save Note" />
        </form>
        {/*<button onClick={this.resetForm}>Reset</button>*/}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    user: state.auth.user,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => {
      dispatch(notes.fetchNotes());
    },
    addNote: (text) => {
      return dispatch(notes.addNote(text));
    },
    updateNote: (id, text) => {
      return dispatch(notes.updateNote(id, text));
    },
    deleteNote: (id) => {
      dispatch(notes.deleteNote(id));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
