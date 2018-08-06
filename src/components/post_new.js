import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field) {
		return (
			<div>
				<label htmlFor={field.name}>{field.labelName}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<p className="red">{field.meta.touched ? field.meta.error : ""}</p>
			</div>
		);
	}

	renderTextArea(field) {
		return (
			<div>
				<label htmlFor={field.name}>{field.labelName}</label>
				<textarea
					className="form-control"
					type="text"
					{...field.input}
				/>
				<p className="red">{field.meta.touched ? field.meta.error : ""}</p>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h2>Create New Post</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						name="title"
						component={this.renderField}
						labelName="Title"
					/>
					<Field
						name="categories"
						component={this.renderField}
						labelName="Categories"
					/>
					<Field
						name="content"
						component={this.renderTextArea}
						labelName="Content"
					/>
					<button type="submit" className="btn btn-secondary">Submit</button>
					<Link to="/" className="btn btn-secondary">Cancel</Link>
					<div className="clear"></div>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	let required = "Required field with minimum length of 3 characters.";

	if ((!values.title) || (values.title.length < 3)) {
		errors.title = required;
	};

	if ((!values.categories) || (values.categories.length < 3)) {
		errors.categories = required;
	};

	if ((!values.content) || (values.content.length < 3)) {
		errors.content = required;
	};

	return errors;
}

export default reduxForm({
	validate,
	form: "NewPostForm"
})(
connect(null, { createPost })(PostsNew)
);