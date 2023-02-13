import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ModalDelete from "./ModalDelete";
import ModalNew from "./ModalNew";
import ModalEdit from "./ModalEdit";
import { Typography } from "@mui/joy";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import {
  DeleteKriteria,
  getDataKriteria,
  postKriteria,
} from "../../Redux/Service/MasterService";
import { toast } from "react-toastify";
import ModalView from "./ModalView";

const Sesi = ({ setLoading }) => {
  const [modalNew, setModalNew] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [DetailData, setDetailData] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [detailId, setDetailId] = useState(null)
  const [level, setLevel] = useState(1)

  const { data, isLoading, refetch } = useQuery(
    ["kriteria",detailId],() => {
      return getDataKriteria(
        `?idKriteriaInduk=${detailId || ""}`
      );
    },
    { refetchIntervalInBackground: false, retry: false }
  );


  const cels = ["Nama Sesi", "Jumlah Kandidat", "Jumlah Kandidat yang telah dinilai", "Nilai", "Action"];

  useEffect(() => {
    if (isLoading ) {
      // setLoading(true);
      console.log("load")
    } else {
      // console.log("unload")
      setLoading(false);
    }
  }, [isLoading,]);

  const openModalNew = (row) => {
    setDetailData(row);
    setModalNew(true);
    console.log('opemn')
  };

  const openModalEdit = (row) => {
    setDetailData(row);
    if (row.jenis === "sub-kriteria") {
      setDetailId(row.idKriteria)
      setLevel(level + 1)
    } else {
      setModalEdit(true);
    }
  };

  const openModalDelete = (row) => {
    setDetailData(row);
    setModalDelete(true);
  };

  
  const openModalView = (row) => {
    setDetailData(row);
    setModalView(true);
  };


  const handleNewSesi = (row) => {
    setLoading(true);
    postKriteria({...row, idKriteriaInduk: !detailId ? null : detailId })
      .then((res) => {
        refetch();
        setModalNew(false);
        setLoading(false);
        toast.success("buat Sesi berhasil");
      })
      .catch((err) => {
        setLoading(false);
        setModalNew(false);
        toast.error(`gagal buat Sesi ${err}`);
      });
  };

  const handleHapusKriteria = (row) => {
    setLoading(true);
    DeleteKriteria(row.idKriteria)
      .then((res) => {
        refetch();
        setModalDelete(false);
        setLoading(false);
        toast.success("Hapus Kriteria berhasil");
      })
      .catch((err) => {
        setLoading(false);
        setModalDelete(false);
        toast.error(`gagal Hapus Kriteria ${err}`);
      });
  };


 
  return (
    <>
      {modalView && (
        <ModalView
          show={modalView}
          closeModal={() => setModalView(false)}
          obj={DetailData}
          setIsloading={setLoading}
        />
      )}

      {modalEdit && (
        <ModalEdit
          level={level}
          setIsloading={setLoading}
          show={modalEdit}
          closeModal={() => setModalEdit(false)}
          obj={DetailData}
          setLoading={setLoading}
        />
      )}

      {modalNew && (
        <ModalNew
          submit={handleNewSesi}
          show={modalNew}
          closeModal={() => setModalNew(false)}
          obj={DetailData}
        />
      )}

      {modalDelete && (
        <ModalDelete
          show={modalDelete}
          closeModal={() => setModalDelete(false)}
          obj={DetailData}
          submit={handleHapusKriteria}
        />
      )}

      <Button
        sx={{ marginBottom: "20px" }}
        variant="contained"
        onClick={() => openModalNew()}
      >
        Tambah Sesi
      </Button>

      <Stack spacing={2}>
        <Typography level="3" textAlign="center">
        Daftar Sesi-Sesi Perekrutan Kandidat Programmer
         </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {cels.map((item) => (
                  <TableCell align="right">{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.daftarKriteria?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: row?.terdapatError ? "#ef5350" : "",
                  }}
                >
                  <TableCell align="right">{row?.nama}</TableCell>
                  <TableCell align="right">{row?.jumlah}</TableCell>
                  <TableCell align="right">{row?.jumlah}</TableCell>
                  <TableCell align="right">{row?.status}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginRight: "8px" }}
                      onClick={() => openModalDelete(row)}
                    >
                      Hapus
                    </Button>
                    <Button
                      disabled={row?.bisaDiClick ? false : true}
                      variant="contained"
                      sx={{ marginRight: "8px" }}
                      onClick={() => openModalEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      disabled={row?.bisaDiClick ? false : true}
                      variant="contained"
                      onClick={() => openModalView(row)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

    </>
  );
};

export default Sesi;
