import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import {  Button, Stack } from "@mui/material";

const ModalDelete = ({ show, closeModal, obj, submit }) => {

  
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={show}
      onClose={() => closeModal()}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog
        aria-labelledby="layout-modal-title"
        aria-describedby="layout-modal-description"
        sx={{ width: { sm: "300px", lg: "500px" }, background: "#FFF" }}
      >
        <ModalClose />
        <Typography id="layout-modal-title" component="h2">
            Hapus Kandidat
        </Typography>
        <Typography id="layout-modal-description" component="h2">
            Anda Yakin Ingin Menghapus Sesi ?
        </Typography>

    
        <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={closeModal} color="error">
            Batal
          </Button>
          <Button variant="contained" onClick={() => submit(obj)} color="primary">
            Simpan
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default ModalDelete;
