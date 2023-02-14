import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { Grid, ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Chip, Stack, TextField } from "@mui/material";
import { getDataKandidatSudahDinilai, getDataKandidatSudahDinilaiDetaail } from "../../Redux/Service/MasterService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ModalDetail = ({ show, closeModal, obj, setLoading }) => {

  const { data, isLoading, refetch } = useQuery(
    ["details", obj?.id], () => {
      return getDataKandidatSudahDinilaiDetaail(obj?.id);
    },
    { refetchIntervalInBackground: false, retry: false }
  );

  console.log(data)

  useEffect(() => {
    if (isLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [isLoading])

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
        sx={{ width: { sm: "300px", lg: "800px" }, background: "#FFF" }}
      >
        <ModalClose />
        <Typography id="layout-modal-title" component="h2">
          hasil Penilaian Programmer {obj?.nama}
        </Typography>

        <Stack spacing={3} sx={{ height: "70vh", overflowY: "auto" }}>


          {
            data?.daftarNilaiKandidat?.map((v) => (
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography id="layout-modal-description" textColor="text.tertiary" >
                      {v.kriteria}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Chip color="success" label={v.intensitas} />
                  </Grid>
                </Grid>

              </Stack>
            ))
          }


        </Stack>

        <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={closeModal} >
            Tutup
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default ModalDetail;
