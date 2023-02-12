import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";

const ModalPenilaian = ({ show, closeModal, obj, submit }) => {
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
        sx={{ width: { sm: "300px", lg: "700px" } }}
      >
        <ModalClose />
        <Typography id="layout-modal-title" component="h2">
          Penilaian Kandidat Programmer {obj?.nama}
        </Typography>

        <Stack spacing={3}>
          <Stack spacing={2} direction="row">
            
            <Typography id="layout-modal-description" textColor="text.tertiary" >
              Penilaian terhadap skill menulis bahasa pemrograman kandidat
              programmer
            </Typography>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Masukan Penilaian" />}
            />
          </Stack>
          <Stack spacing={2} direction="row">
            
            <Typography id="layout-modal-description" textColor="text.tertiary" >
              Penilaian terhadap skill menulis bahasa pemrograman kandidat
              programmer
            </Typography>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Masukan Penilaian" />}
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={closeModal} color="error">
            Batal
          </Button>
          <Button variant="contained" onClick={submit} color="primary">
            Simpan
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default ModalPenilaian;
