import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
 
class PostsIndex extends Component {

	componentDidMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return _.map(this.props.posts, (post) => {
			return (
				<Link to={`/posts/${post.id}`} key={post.id} className="list-link">
					<li className="list-group-item" >
						<h3>{post.title}</h3>
						<p>{post.content.substring(0,50)}...</p>
						<span>Categories: {post.categories}</span>
					</li>
				</Link>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="float-right">
					<Link className="btn btn-secondary" to="/posts/new">
						Create
					</Link>
				</div>
				<h2>Your Blog Posts</h2>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);