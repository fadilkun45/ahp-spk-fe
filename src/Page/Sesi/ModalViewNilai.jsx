import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { Grid, ModalDialog, Table } from "@mui/joy";
import {
  Button,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { useState, useEffect } from "react";
import ModalDelete from "./ModalDelete";
// import ModalNewIntesitas from "./ModalNewIntesitas";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import ModalNewKandidat from "./ModalNewKandidat";
import { getDataDetailSesiKandidat } from "../../Redux/Service/MasterService";

const ModalViewNilai = ({
  show,
  closeModal,
  obj,
  submit,
  setIsloading,
  perbandingan,
  level
}) => {
  const [modalNew, setModalNew] = useState(false);
  const [DetailData, setDetailData] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { data, isLoading, refetch } = useQuery(
    ["KandidatDetailSesi"],
    () => {
      return getDataDetailSesiKandidat(obj?.id)
    },
    { refetchIntervalInBackground: false, retry: false }
  );

  const cels = [
    "Pertanyaan",
    "Penilaian",
    "Nilai Ideal",
    "Nilai Normal",
  ];

  useEffect(() => {

    if (isLoading ) {
      setIsloading(true)
    } else {
      setIsloading(false)
    }

  }, [isLoading])


  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={show}
        onClose={() => closeModal()}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          sx={{ width: "80%", background: "#FFF" }}
        >
          <ModalClose />
          <Typography id="layout-modal-title" component="h2">
            Penilaian Terhadap {data?.namaKandidat} oleh {data?.namaSeniorProgrammer}
          </Typography>


          <Stack sx={{ overflowY: "auto", height: "60vh" }}>



            <Stack spacing={2}>
              {/* <Typography level="3" textAlign="center">

              </Typography> */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {cels.map((item) => (
                        <TableCell align="right">{item}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.daftarNilaiKandidat?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 }
                        }}
                      >
                        <TableCell align="left">{row?.kriteria}</TableCell>
                        <TableCell align="left">{row?.intensitas}</TableCell>
                        <TableCell align="left">{row?.nilaiIdeal}</TableCell>
                        <TableCell align="left">{row?.nilaiNormal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
            <Grid container rowSpacing={1}>
              <Grid item xs={6}>
                <Typography>Rata-Rata Nilai Ideal</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{data?.rataRataNilaiIdeal}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Total Nilai Nilai Normal</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{data?.totalNilaiNormal}</Typography>
              </Grid>

            </Grid>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
            <Button variant="contained" onClick={closeModal} color="primary">
              Tutup
            </Button>
            {/* <Button variant="contained" onClick={submit} color="primary">
              Simpan
            </Button> */}
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ModalViewNilai;
