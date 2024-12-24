import { Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import { ProfileCircle, Send } from 'iconsax-react-native';
import { AuthContextProps, CommentProps, CommentState } from '@shared/types';
import { TextInput } from 'react-native-paper';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'firebase.config';
import { AuthContext } from 'src/context/AuthContext';
import styles from './style';
import { Section } from '@components';

class Comment extends Component<CommentProps, CommentState> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;
  public constructor(props: CommentProps) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
      isCommenting: false,
      messages: '',
      loadingComments: true,
    };
  }

  public override async componentDidMount() {
    const { id } = this.props;
    if (id) {
      try {
        const commentsDocRef = doc(db, 'users', 'comments');
        const commentsDoc = await getDoc(commentsDocRef);
        if (commentsDoc.exists()) {
          const commentsData = commentsDoc.data();
          if (commentsData[id]) {
            this.setState({ comments: commentsData[id] });
          }
        }
      } catch (error) {
        console.error('Error fetching comments: ', error);
      } finally {
        this.setState({ loadingComments: false });
      }
    }
  }

  private saveComment = async (
    id: number,
    comment: string,
    username: string,
  ) => {
    try {
      const commentsDocRef = doc(db, 'users', 'comments');
      const commentsDoc = await getDoc(commentsDocRef);
      let commentsData = commentsDoc.exists() ? commentsDoc.data() : {};
      if (!commentsData[id]) {
        commentsData[id] = [];
      }
      commentsData[id].push({
        comment,
        username,
        timestamp: new Date().toISOString(),
      });
      await setDoc(commentsDocRef, commentsData, { merge: true });
    } catch (error) {
      console.error('Error saving comment: ', error);
    }
  };

  private handlePostComment = async () => {
    const { id } = this.props;
    const { username } = this.context || {};
    if (id !== undefined && username) {
      this.setState({ isCommenting: true });
      await this.saveComment(id, this.state.comment, username);
      this.setState(
        prevState => ({
          comments: [
            ...prevState.comments,
            {
              comment: prevState.comment,
              username,
              timestamp: new Date().toISOString(),
            },
          ],
          comment: '',
          isCommenting: false,
          messages: 'Posted!',
        }),
        () => {
          setTimeout(() => {
            this.setState({ messages: '' });
          }, 3000);
        },
      );
    }
  };

  private formatTimestamp = (timestamp: string) => {
    const commentDate = new Date(timestamp);
    const now = new Date();
    const timeDifference = now.getTime() - commentDate.getTime();
    const minutesDifference = timeDifference / (1000 * 60);
    const hoursDifference = timeDifference / (1000 * 3600);
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (minutesDifference < 60) {
      const minutes = Math.floor(minutesDifference);
      return `${minutes} minutes ago`;
    } else if (hoursDifference < 24) {
      const hours = Math.floor(hoursDifference);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(daysDifference);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  private handleChangeText = (text: string) => {
    this.setState({ comment: text });
  };

  public override render() {
    const { id } = this.props;
    const { username } = this.context || {};
    const isCommentValid =
      this.state.comment.trim() !== '' && id !== undefined && username;
    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <ProfileCircle size='35' style={styles.profileIcon} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Write a comment...'
              underlineColorAndroid='transparent'
              value={this.state.comment}
              multiline={true}
              textAlignVertical='top'
              theme={{
                colors: {
                  background: 'transparent',
                  primary: '#e0e0e0',
                },
              }}
              onChangeText={this.handleChangeText}
            />
            <TouchableOpacity
              style={styles.sendIcon}
              disabled={!isCommentValid}
              onPress={isCommentValid ? this.handlePostComment : undefined}
            >
              <Send size={20} color={isCommentValid ? 'gray' : 'lightgray'} />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.messages ? (
          <Text style={styles.successMessage}>{this.state.messages}</Text>
        ) : null}

        <Section.HorizontalList
          loading={this.state.loadingComments}
          data={this.state.comments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <View style={styles.commentHeader}>
                <ProfileCircle
                  size={30}
                  variant='Linear'
                  style={styles.profileTick}
                />
                <Text style={styles.commentUsername}>@{item.username}</Text>
                <Text style={styles.commentTimestamp}>
                  {this.formatTimestamp(item.timestamp)}
                </Text>
              </View>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          noResultText='No comments yet'
        />
      </View>
    );
  }
}

export default Comment;
