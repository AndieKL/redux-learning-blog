import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostShow extends Component {

	constructor(props) {
		super(props);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	componentDidMount() {
		if (!this.props.post) {
			const { id } = this.props.match.params;
			this.props.fetchPost(id);
		}
	}

	onDeleteClick() {

		const { id } = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}


	render() {
		const { post } = this.props;

		if (!post) {
			return (<div><h2 className="red">Loading...</h2></div>);
		}

		return (
			<div>
				<h2>{post.title}</h2>
				<div className="post">
					<p>{post.content}</p>
					<span>Categories: {post.categories}</span>
					<Link to="" className="btn btn-secondary">Back</Link>
					<button 
						className="btn btn-danger"
						onClick={this.onDeleteClick}
						>Delete</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}


export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);