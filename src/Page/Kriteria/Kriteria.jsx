import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
  getDataPerbandingan,
  postKriteria,
  postPerbandingan,
} from "../../Redux/Service/MasterService";
import { toast } from "react-toastify";
import ModalEditIntesitas from "./ModalEditIntesitas";

const Kriteria = ({ setLoading }) => {
  const [modalNew, setModalNew] = useState(false);
  const [DetailData, setDetailData] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditIntesitas, setModalEditIntesitas] = useState(false);
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

  const {
    data: perbandingan,
    isLoading: loadPerbandingan,
    refetch: refetchPerbandingan,
  } = useQuery(
    ["dropdownPerbandingan"],
    () => {
      return getDataPerbandingan();
    },
    { refetchIntervalInBackground: false,retry: false  }
  );

  const [dataDrop, setDataDrop] = useState([]);

  const cels = ["Nama", "Bobot Prioritas", "memiliki", "Action"];

  const celsBanding = [
    "Nama",
    "Bobot Prioritas",
    "Nama Kriteria yang dibandingkan",
  ];

  useEffect(() => {
    let data = [];

    perbandingan?.dropdown?.map((v) => {
      data.push({ id: v.id, label: v.keterangan });
    });

    setDataDrop(data);
  }, [perbandingan]);

  useEffect(() => {
    if (isLoading || loadPerbandingan) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, loadPerbandingan]);

  const openModalNew = (row) => {
    setDetailData(row);
    setModalNew(true);
    console.log('opemn')
  };

  const openModalEdit = (row) => {
    setDetailData(row);
    if (row.jenis === "sub-kriteria") {
      // setModalEdit(true)
      setLoading(true)
      // refetch().then((res) => {
      //   setLoading(false)
      // })
      setDetailId(row.idKriteria)
      setLevel(level + 1)
    } else {
      setModalEditIntesitas(true);
    }
  };

  const openModalDelete = (row) => {
    setDetailData(row);
    setModalDelete(true);
  };

  const handleNewKriteria = (row) => {
    setLoading(true);
    postKriteria({...row, idKriteriaInduk: !detailId ? null : detailId })
      .then((res) => {
        refetch();
        setModalNew(false);
        setLoading(false);
        toast.success("buat Kriteria berhasil");
      })
      .catch((err) => {
        setLoading(false);
        setModalNew(false);
        toast.error(`gagal buat Kriteria ${err}`);
      });
  };

  const handlePilihPerbandingan = (value, row) => {
    console.log(value);
    setLoading(true);
    postPerbandingan({
      idKriteriaPertama: row?.idkriteriapertama,
      idKriteriaKedua: row?.idkriteriakedua,
      idPenilaian: value,
    })
      .then((res) => {
        refetch();
        setModalNew(false);
        setLoading(false);
        toast.success("Perbandingan Kriteria berhasil");
      })
      .catch((err) => {
        setLoading(false);
        setModalNew(false);
        toast.error(`gagal Perbandingan Kriteria ${err}`);
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

  const handleKembaliKelevel1 = () => {
    // setLoading(true)
    setDetailId('')
    setLevel(1)
    setDetailData(null)
  }

 
  return (
    <>
      {modalEdit && (
        <ModalEdit
          show={modalEdit}
          closeModal={() => setModalEdit(false)}
          obj={DetailData}
          setIsloading={setLoading}
        />
      )}

      {modalEditIntesitas && (
        <ModalEditIntesitas
          setIsloading={setLoading}
          show={modalEditIntesitas}
          closeModal={() => setModalEditIntesitas(false)}
          obj={DetailData}
          perbandingan={perbandingan}
          setLoading={setLoading}
        />
      )}

      {modalNew && (
        <ModalNew
          submit={handleNewKriteria}
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
        Tambah Kriteria
      </Button>
      {
        level !== 1 ? <Button
          sx={{ marginBottom: "20px", marginLeft: "15px" }}
          variant="contained"
          onClick={() => handleKembaliKelevel1()}
        >
          Kembali Ke Awal
        </Button> : null
      }

      <Stack spacing={2}>
        <Typography level="3" textAlign="center">
          Level {level} Hirarki AHP Pemilihan Programmer
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
                  <TableCell align="right">{row?.namaKriteria}</TableCell>
                  <TableCell align="right">{row?.bobot}</TableCell>
                  <TableCell align="right">{row?.jenis}</TableCell>
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
                      onClick={() => openModalEdit(row)}
                    >
                      Update Sub
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Stack spacing={2} sx={{ marginTop: "60px" }}>
        <Typography level="3" textAlign="center">
          Perbandingan Berpasangan Level {level} Hirarki AHP Pemilihan Programmer
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {celsBanding.map((item) => (
                  <TableCell align="right">{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.daftarPerbandingan?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    {row?.namakriteriapertama}
                  </TableCell>
                  <TableCell align="center">
                    <FormControl variant="standard" sx={{ width: 300 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Pilih Bobot
                      </InputLabel>
                      <Select
                        // labelId={row?.idnilai}
                        defaultValue={row?.idnilai}
                        onChange={(v) =>
                          handlePilihPerbandingan(v.target.value, row)
                        }
                        label="Age"
                      >
                        {dataDrop?.map((v) => (
                          <MenuItem value={v.id}>{v.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">{row?.namakriteriakedua}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default Kriteria;
