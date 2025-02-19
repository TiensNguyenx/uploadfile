
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineLoading } from "react-icons/ai";
import classNames from 'classnames/bind';
import styles from './loading.module.scss';
const  Loading = ({handleClose,show}) => {
const cx = classNames.bind(styles);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx('title')}>Almost There... <AiOutlineLoading className={cx('loading-icon')} /></Modal.Title>
        </Modal.Header>
        <Modal.Body>The system is preparing your file for download. Please do not close the page!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Download
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Loading;