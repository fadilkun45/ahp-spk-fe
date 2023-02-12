import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

const ModalChangePassword = ({ show, closeModal, obj, submit }) => {

  let [password,setPassword] = useState()

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
          Ganti Password
      </Typography>

      <Stack spacing={3}>
          
        <TextField id="standard-basic" type="password" label="Masukan Password baru" onChange={(v) => setPassword(v.target.value)} variant="standard" />

      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
        <Button variant="contained" onClick={closeModal} color="error">
          Batal
        </Button>
        <Button variant="contained" disabled={!password ? true : false} onClick={() => submit(password)} color="primary">
          Simpan
        </Button>
      </Stack>
    </ModalDialog>
  </Modal>
  );
};

export default ModalChangePassword