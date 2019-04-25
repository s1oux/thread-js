import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { likePost, toggleExpandedPost } from 'src/components/post/logic/postActions';

import styles from './expandedPost.module.scss';

class ExpandedPost extends React.Component {
    handleClickOutside = () => {
        const { postId } = this.props;
        this.props.toggleExpandedPost(postId);
    }

    handleClickOnLike = () => {
        const { id } = this.props.post;
        this.props.likePost(id);
    }

    handleClickInside = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
    }

    renderImage = () => {
        const { post } = this.props;
        const { image } = post;
        const imgLink = image && image.link;
        if (imgLink) {
            return <img src={imgLink} alt="post" />;
        }
        return null;
    }

    render() {
        const { post } = this.props;
        const {
            user,
            createdAt,
            body,
            likeCount,
            dislikeCount,
            commentCount
        } = post;
        const date = new Date(createdAt);

        return (
            <div className={styles.root} onClick={this.handleClickOutside}>
                <div className={styles.wrapper} onClick={this.handleClickInside}>
                    {this.renderImage()}
                    <div className={styles.text}>{body}</div>
                    <div className={styles['additional-info']}>
                        <div>{`Created at: ${date.toDateString()} by ${user.username}`}</div>
                        <div>
                            {`Liked ${likeCount} times`}
                            <button type="button" onClick={this.handleClickOnLike}>Like!</button>
                        </div>
                        <div>{`Disliked ${dislikeCount} times`}</div>
                        <div>{`Commented ${commentCount} times`}</div>
                    </div>
                </div>
            </div>
        );
    }
}

ExpandedPost.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    postId: PropTypes.string
};

ExpandedPost.defaultProps = {
    postId: undefined
};

const mapStateToProps = (rootState, ownProps) => {
    const { posts } = rootState.posts;
    const { postId } = ownProps;
    const post = postId && posts && posts.find(p => (p.id === postId));
    return { post };
};

const actions = { likePost, toggleExpandedPost };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandedPost);