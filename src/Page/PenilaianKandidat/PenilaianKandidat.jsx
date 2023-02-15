import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModalPenilaian from "./ModalPenilaian";
import ModalDetail from "./ModalDetail";
import { useQuery } from "@tanstack/react-query";
import { getDataKandidatBelumDinilai, getDataKandidatSudahDinilai, postKriteria, postPenilaian } from "../../Redux/Service/MasterService";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PenilaianKandidat = ({ setLoading }) => {
  const [statusTab, setStatusTab] = useState(0)
  const [modalPenilaian, setModalPenilaian] = useState(false)
  const [modalDetail, setModalDetail] = useState(false)
  const [DetailData, setDetailData] = useState(null)
  const users = useSelector((state) => state.login.res)

  const { data: dataSudahDinilai, isLoading, refetch } = useQuery(
    ["sudahDinilai"], () => {
      return getDataKandidatSudahDinilai(users?.id);
    },
    { refetchIntervalInBackground: false, retry: false }
  );

  const { data: dataBelumDinilai, isLoading: isLoadingDataBelomDiNilai, refetch: refecthDataBelomDinilai } = useQuery(
    ["BelomDinilai"], () => {
      return getDataKandidatBelumDinilai(users.id);
    },
    { refetchIntervalInBackground: false, retry: false }
  );

  const cels = ["Nama", "Sesi Rekutmen", "Action"];

  const handleChange = (event, newValue) => {
    setStatusTab(newValue);
    if (newValue === 0) {
      refetch()
    } else {
      refecthDataBelomDinilai()
    }
  };

  const openModalPenilaian = (row) => {
    setDetailData(row)
    setModalPenilaian(true)

  }

  const openModalDetail = (row) => {
    setDetailData(row)
    setModalDetail(true)

  }

  useEffect(() => {

    if (isLoading || isLoadingDataBelomDiNilai) {
      setLoading(true)
    } else {
      setLoading(false)
    }

  }, [isLoading, isLoadingDataBelomDiNilai])

  const handlePenilaian = (row) => {
    setLoading(true);
    postPenilaian({ dataDataPenilaian: row},DetailData?.id)
      .then((res) => {
        refetch();
        setModalPenilaian(false);
        setLoading(false);
        toast.success("Penilaian berhasil");
      })
      .catch((err) => {
        setLoading(false);
        setModalPenilaian(false);
        toast.error(`gagal Penilaian ${err}`);
      });
  };



  return (
    <>

      {modalPenilaian && <ModalPenilaian show={modalPenilaian} closeModal={() => setModalPenilaian(false)} obj={DetailData} submit={handlePenilaian} />}
      {modalDetail && <ModalDetail setLoading={setLoading} show={modalDetail} closeModal={() => setModalDetail(false)} obj={DetailData} />}

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={statusTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Belum Dinilai" {...a11yProps(0)} />
            <Tab label="sudah Dinilai" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {
          <TableContainer component={Paper} sx={{ display: statusTab === 0 ? "block" : "none", marginTop: "20px" }} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {cels.map((item) => (
                    <TableCell align="right">{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataBelumDinilai?.daftarKandidat?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.nama}</TableCell>
                    <TableCell align="right">{row.namaSesiRekrutmen}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={() => openModalPenilaian(row)}>Nilai Kandidat</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        {
          <TableContainer component={Paper} sx={{ display: statusTab === 1 ? "block" : "none", marginTop: "20px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {cels.map((item) => (
                    <TableCell align="right">{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSudahDinilai?.daftarKandidat?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.nama}</TableCell>
                    <TableCell align="right">{row.namaSesiRekrutmen}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={() => openModalDetail(row)}>View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Box>
    </>
  );
};

export default PenilaianKandidat;
