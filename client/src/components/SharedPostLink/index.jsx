import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Icon } from 'semantic-ui-react';
import validator from 'validator';

import styles from './styles.module.scss';

const SharedPostLink = ({ postId, sharePostByEmail, close }) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  let input = useRef();

  const shareLink = `${window.location.origin}/share/${postId}`;

  const copyToClipboard = e => {
    input.select();
    document.execCommand('copy');
    e.target.focus();
    setCopied(true);
  };

  const emailChanged = data => {
    setEmail(data);
    setIsEmailValid(true);
  };

  const handleSendClick = async () => {
    if (!isEmailValid) {
      return;
    }
    try {
      await sharePostByEmail(email, shareLink);
    } catch {

    }
  };

  return (
    <Modal open onClose={close}>
      <Modal.Header className={styles.header}>
        <span>Share Post</span>
        {copied && (
          <span>
            <Icon color="green" name="copy" />
            Copied
          </span>
        )}
      </Modal.Header>
      <Modal.Content>
        <Input
          fluid
          action={{
            color: 'teal',
            labelPosition: 'right',
            icon: 'copy',
            content: 'Copy',
            onClick: copyToClipboard
          }}
          value={shareLink}
          ref={ref => { input = ref; }}
        />
        <br />
        <Input
          fluid
          action={{
            color: 'teal',
            labelPosition: 'right',
            icon: 'mail',
            content: 'Send',
            onClick: handleSendClick
          }}
          placeholder="Enter recipient's email"
          value={email}
          type="email"
          error={!isEmailValid}
          onChange={ev => emailChanged(ev.target.value)}
          onBlur={() => setIsEmailValid(validator.isEmail(email))}
        />
      </Modal.Content>
    </Modal>
  );
};

SharedPostLink.propTypes = {
  postId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default SharedPostLink;
