import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

const ModalNewAkun = ({ show, closeModal, obj, submit }) => {

  const [form,setForm] = useState({
    nama: "",
    email: "",
    kataSandi: "",
    jabatan: ""
  })

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
            Buat Akun Baru
        </Typography>

        <Stack spacing={3}>
            
          <TextField id="standard-basic" label="Nama" variant="standard"   onChange={(v) => setForm({...form, nama: v.target.value})}/>
          <TextField id="standard-basic" label="Email" variant="standard"  onChange={(v) => setForm({...form, email: v.target.value})}/>
          <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["Senior Programmer","Human Resouce","Chief Executive Officer"]}
              onChange={(v) => setForm({...form, jabatan: v.target.textContent})}
              renderInput={(params) => <TextField {...params} label="Jabatan" />}
            />
          <TextField id="standard-basic" type="password" label="Password" variant="standard" onChange={(v) => setForm({...form, kataSandi: v.target.value})} />

        </Stack>

        <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={closeModal} color="error">
            Batal
          </Button>
          <Button variant="contained" onClick={() => submit(form)} color="primary">
            Simpan
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default ModalNewAkun;
