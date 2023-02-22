import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog, Table } from "@mui/joy";
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
import { getDataDetailSesi } from "../../Redux/Service/MasterService";
import ModalDelete from "./ModalDelete";
// import ModalNewIntesitas from "./ModalNewIntesitas";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import {
  DeleteKriteria,
  getDataKriteria,
  postIntesitas,
  postKriteria,
  postPerbandingan,
} from "../../Redux/Service/MasterService";
import { useQuery } from "@tanstack/react-query";
import ModalNewKandidat from "./ModalNewKandidat";
import ModalViewNilai from "./ModalViewNilai";

const ModalView = ({
  show,
  closeModal,
  obj,
  submit,
  setIsloading,
  perbandingan,
  level
}) => {
  const [DetailData, setDetailData] = useState(null);
  const [modalView, setModalView] = useState(false)
  const [modalDelete, setModalDelete] = useState(false);
  const { data, isLoading, refetch } = useQuery(
    ["sesiDetails"],
    () => {
      return getDataDetailSesi(obj.idSesi);
    },
    { refetchIntervalInBackground: false, retry: false }
  );

  const cels = [
    "Nama Kandidat",
    "Rata-Rata Nilai Ideal",
    "Total Nilai Normal",
    "Ranking",
    "Pemberi Nilai",
    "No HP",
    "Email",
    "Action"
  ];

  const openModalDetail = (row) => {
    setDetailData(row)
    setModalView(true)
  }


  return (
    <>
      {modalView &&  <ModalViewNilai setIsloading={setIsloading} show={modalView} obj={DetailData} closeModal={() => setModalView(false)} />}

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
            History Sesi
          </Typography>

          <Button
            sx={{ marginBottom: "20px" }}
            variant="contained"
          // onClick={() => ()}
          >
            Unduh Laporan
          </Button>

          <Stack sx={{ overflowY: "auto", height: "60vh" }}>

            <Stack spacing={2}>
              {/* <Typography level="3" textAlign="center">

              </Typography> */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {cels.map((item) => (
                        <TableCell align="right">{item}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.daftarKandidatSesi?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 }
                        }}
                      >
                        <TableCell align="left">{row?.nama}</TableCell>
                        <TableCell align="left">{row?.rataRataNilaiIdeal}</TableCell>
                        <TableCell align="left">{row?.totalNilaiNormal}</TableCell>
                        <TableCell align="left">{row?.rank}</TableCell>
                        <TableCell align="left">{row?.namaSeniorProgrammerPenilai}</TableCell>
                        <TableCell align="left">{row?.noHp}</TableCell>
                        <TableCell align="left">{row?.email}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            sx={{ marginTop: "10px" }}
                            onClick={() => openModalDetail(row)}
                          >
                            Hasil
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>

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

export default ModalView;
