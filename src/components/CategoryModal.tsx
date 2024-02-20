import { Button, Modal } from "react-bootstrap";

interface ListProps {
  categoryValues: string;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  isModalOpen: boolean;
}

export const CategoryModal: React.FC<ListProps> = ({
  categoryValues,
  handleCloseModal,
  isModalOpen,
}) => {
  return (
    <>
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ah Oh!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There is no entry with the category name {categoryValues}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
