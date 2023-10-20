import "./index.css";
import { Checkbox, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import ButtonCustom from "./components/button";

interface Campaign {
  checked: boolean;
  nameCampaigns: string;
  campaignsCount: number;
  id: number;
  listAdvertise: Advertise[];
}

interface Advertise {
  nameAdvertise: string;
  advertiseCount: number;
  id: number;
}

export default function TabTwoComponent() {
  useEffect(() => {
    // Cập nhật lại danh sách chiến dịch từ Local Storage (nếu có)
    const storedCampaigns = localStorage.getItem("campaigns");
    setSelectCampaigns(1);
    if (storedCampaigns) {
      setCampaigns(JSON.parse(storedCampaigns));
    }
  }, []);

  useEffect(() => {
    if (selectCampaigns !== undefined) {
      const selectedCampaign = campaigns.find(
        (campaign) => campaign.id === selectCampaigns
      );
      if (selectedCampaign) {
        const updatedCampaigns = campaigns.map((c) =>
          c.id === selectCampaigns
            ? {
                ...c,
                campaignsCount: selectedCampaign.listAdvertise.reduce(
                  (total, advertise) => total + advertise.advertiseCount,
                  0
                ),
              }
            : c
        );

        setCampaigns(updatedCampaigns);
        setItemLocal(updatedCampaigns);
      }
    }
  }, []);

  const [checked, setChecked] = useState<boolean>(true);
  const [checkedAdvertiseIds, setCheckedAdvertiseIds] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  function calculateAdvertiseCount(campaign: Campaign): number {
    return campaign.listAdvertise.reduce(
      (total, advertise) => total + advertise.advertiseCount,
      0
    );
  }

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const storedCampaigns = localStorage.getItem("campaigns");
    if (storedCampaigns) {
      return JSON.parse(storedCampaigns);
    }
    return [
      {
        checked: true,
        nameCampaigns: "Chiến dịch con 1",
        campaignsCount: 0,
        id: 1,
        listAdvertise: [
          { nameAdvertise: "Quảng cáo 1", advertiseCount: 0, id: 1 },
        ],
      },
    ];
  });
  const [selectCampaigns, setSelectCampaigns] = useState<number>();

  const addCampaign = () => {
    const newCampaign = {
      checked: true,
      nameCampaigns: `Chiến dịch con ${campaigns.length + 1}`,
      campaignsCount: 0,
      id: campaigns.length + 1,
      listAdvertise: [
        { nameAdvertise: "Quảng cáo 1", advertiseCount: 0, id: 1 },
      ],
    };
    setCampaigns([...campaigns, newCampaign]);
    const updatedCampaigns = [...campaigns, newCampaign];
    setItemLocal(updatedCampaigns);
    setSelectCampaigns(campaigns.length + 1);
  };

  function setItemLocal(updatedCampaigns: any) {
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  }

  function handleAddAds() {
    const selectedCampaign = campaigns.find(
      (campaign) => campaign.id === selectCampaigns
    );

    if (selectedCampaign) {
      const lastAdvertise =
        selectedCampaign.listAdvertise[
          selectedCampaign.listAdvertise.length - 1
        ];
      const newAdvertise = {
        id: lastAdvertise ? lastAdvertise.id + 1 : 1,
        nameAdvertise: `Quảng cáo ${lastAdvertise ? lastAdvertise.id + 1 : 1}`,
        advertiseCount: 0,
      };
      const updatedAdvertiseList = [...selectedCampaign.listAdvertise];
      updatedAdvertiseList.push(newAdvertise);
      selectedCampaign.listAdvertise = updatedAdvertiseList;
      const updatedCampaigns = [...campaigns];
      setCampaigns(updatedCampaigns);
      setItemLocal(updatedCampaigns);
    }
  }

  const handleDeleteCheckedAdvertise = () => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === selectCampaigns) {
        const updatedAdvertiseList = campaign.listAdvertise.filter(
          (advertise) => !checkedAdvertiseIds.includes(advertise.id)
        );

        const updatedCampaignsCount = updatedAdvertiseList.reduce(
          (total, ad) => total + ad.advertiseCount,
          0
        );

        return {
          ...campaign,
          listAdvertise: updatedAdvertiseList,
          campaignsCount: updatedCampaignsCount,
        };
      } else {
        return campaign;
      }
    });
    setSelectAllChecked(false);
    setCampaigns(updatedCampaigns);
    setItemLocal(updatedCampaigns);
    setCheckedAdvertiseIds([]);
  };

  const handleAdvertiseCheckChange = (advertiseId: number) => {
    setCheckedAdvertiseIds((prevCheckedAdvertiseIds) => {
      if (prevCheckedAdvertiseIds.includes(advertiseId)) {
        return prevCheckedAdvertiseIds.filter((id) => id !== advertiseId);
      } else {
        return [...prevCheckedAdvertiseIds, advertiseId];
      }
    });
  };

  useEffect(() => {
    const selectedCampaign = campaigns.find(
      (campaign) => campaign.id === selectCampaigns
    );
    if (selectedCampaign) {
      const areAllAdvertiseChecked = selectedCampaign.listAdvertise.every(
        (advertise) => checkedAdvertiseIds.includes(advertise.id)
      );
      setSelectAllChecked(areAllAdvertiseChecked);
    }
  }, [checkedAdvertiseIds]);

  const handleSelectAllChange = () => {
    if (selectCampaigns !== undefined) {
      const selectedCampaign = campaigns.find(
        (campaign) => campaign.id === selectCampaigns
      );

      if (selectedCampaign) {
        const areAllAdvertiseChecked = selectedCampaign.listAdvertise.every(
          (advertise) => checkedAdvertiseIds.includes(advertise.id)
        );

        let updatedCheckedAdvertiseIds: number[];

        if (areAllAdvertiseChecked) {
          updatedCheckedAdvertiseIds = [];
        } else {
          updatedCheckedAdvertiseIds = selectedCampaign.listAdvertise.map(
            (advertise) => advertise.id
          );
        }

        setCheckedAdvertiseIds(updatedCheckedAdvertiseIds);
        setSelectAllChecked(!areAllAdvertiseChecked);
      }
    }
  };

  return (
    <Paper className="tab-2">
      <div className="header-wrapper">
        <Button
          onClick={addCampaign}
          variant="contained"
          color="primary"
          style={{
            borderRadius: "50%",
            width: "48px",
            height: "60px",
            padding: "0",
          }}
        >
          <AddIcon />
        </Button>
        {campaigns.map((campaign, index) => {
          return (
            <div
              onClick={() => {
                setSelectCampaigns(campaign.id);
                setChecked(campaign.checked);
              }}
              className={
                campaign.id === selectCampaigns
                  ? `container-camp-active`
                  : `container-camp`
              }
              key={index}
            >
              <div className="wrapper-name">
                <p className="header-text-name">{campaign.nameCampaigns}</p>
                <CheckCircleIcon
                  fontSize="small"
                  color={campaign.checked ? "success" : "disabled"}
                />
              </div>
              <p className="number-ads">{campaign.campaignsCount}</p>
            </div>
          );
        })}
      </div>
      <div className="input-wrapper">
        <TextField
          required
          id="standard-required"
          label="Tên chiến dịch con"
          variant="standard"
          value={
            campaigns.find((campaign) => campaign.id === selectCampaigns)
              ?.nameCampaigns || ""
          }
          className="input-text"
          onChange={(e) => {
            const updatedCampaigns = campaigns.map((campaign) => {
              if (campaign.id === selectCampaigns) {
                return { ...campaign, nameCampaigns: e.target.value };
              }
              return campaign;
            });
            setCampaigns(updatedCampaigns);
            setItemLocal(updatedCampaigns);
          }}
        />
        <Checkbox
          checked={checked}
          onChange={(e) => {
            const updatedCampaigns = campaigns.map((campaign) => {
              if (campaign.id === selectCampaigns) {
                setChecked(e.target.checked);
                return { ...campaign, checked: e.target.checked };
              }
              return campaign;
            });
            setCampaigns(updatedCampaigns);
            setItemLocal(updatedCampaigns);
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <span>Đang hoạt động</span>
      </div>

      <h3>DANH SÁCH QUẢNG CÁO</h3>
      <ButtonCustom
        title="Xoá"
        children={<DeleteIcon />}
        onClick={handleDeleteCheckedAdvertise}
        disabled={checkedAdvertiseIds.length === 0}
      />

      <div className="wrapper-header">
        <div className="item-header">
          {/* ItemCheck 2 */}
          <Checkbox
            checked={selectAllChecked}
            onChange={handleSelectAllChange}
            inputProps={{ "aria-label": "select all" }}
          />
          <span>Tên quảng cáo*</span>
        </div>
        <span className="item-header">Số lượng*</span>
        <ButtonCustom
          title="Thêm"
          children={<AddIcon />}
          onClick={handleAddAds}
        />
      </div>

      {campaigns.map((campaign) => {
        if (campaign.id === selectCampaigns) {
          return campaign.listAdvertise.map((advertise) => {
            return (
              <div className="wrapper-list" key={advertise.id}>
                <div className="item-header-field">
                  {/* ItemCheck 1 */}
                  <Checkbox
                    checked={checkedAdvertiseIds.includes(advertise.id)}
                    onChange={() => handleAdvertiseCheckChange(advertise.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <TextField
                    className="item-header"
                    error={false}
                    id="standard-error"
                    variant="standard"
                    value={advertise.nameAdvertise}
                    onChange={(e) => {
                      const updatedAdvertise = {
                        ...advertise,
                        nameAdvertise: e.target.value,
                      };
                      const updatedAdvertiseList = campaign.listAdvertise.map(
                        (ad) => (ad.id === advertise.id ? updatedAdvertise : ad)
                      );
                      const updatedCampaigns = campaigns.map((c) =>
                        c.id === campaign.id
                          ? { ...c, listAdvertise: updatedAdvertiseList }
                          : c
                      );
                      setCampaigns(updatedCampaigns);
                      setItemLocal(updatedCampaigns);
                    }}
                  />
                </div>
                <TextField
                  className="item-header"
                  error={false}
                  id="standard-error"
                  label=""
                  variant="standard"
                  type="number"
                  value={advertise.advertiseCount}
                  onChange={(e) => {
                    const updatedAdvertise = {
                      ...advertise,
                      advertiseCount: Number(e.target.value),
                    };
                    const updatedAdvertiseList = campaign.listAdvertise.map(
                      (ad) => (ad.id === advertise.id ? updatedAdvertise : ad)
                    );
                    const updatedCampaignsCount = calculateAdvertiseCount({
                      ...campaign,
                      listAdvertise: updatedAdvertiseList,
                    });
                    const updatedCampaign = {
                      ...campaign,
                      listAdvertise: updatedAdvertiseList,
                      campaignsCount: updatedCampaignsCount,
                    };
                    const updatedCampaigns = campaigns.map((c) =>
                      c.id === campaign.id ? updatedCampaign : c
                    );

                    setCampaigns(updatedCampaigns);
                    setItemLocal(updatedCampaigns);
                  }}
                />
                <ButtonCustom
                  title="Xoá"
                  children={<DeleteIcon />}
                  onClick={() => {
                    const idToDelete = advertise.id;
                    const selectedCampaign = campaigns.find(
                      (campaign) => campaign.id === selectCampaigns
                    );
                    if (selectedCampaign) {
                      const updatedAdvertiseList =
                        selectedCampaign.listAdvertise.filter(
                          (ad) => ad.id !== idToDelete
                        );
                      selectedCampaign.listAdvertise = updatedAdvertiseList;
                      const updatedCampaigns = campaigns.map((c) =>
                        c.id === selectCampaigns ? selectedCampaign : c
                      );
                      const updatedSelectedCampaign = updatedCampaigns.find(
                        (campaign) => campaign.id === selectCampaigns
                      );
                      if (updatedSelectedCampaign) {
                        const newCampaignsCount =
                          updatedSelectedCampaign.listAdvertise.reduce(
                            (total, ad) => total + ad.advertiseCount,
                            0
                          );
                        updatedSelectedCampaign.campaignsCount =
                          newCampaignsCount;
                      }

                      setCampaigns(updatedCampaigns);
                      setItemLocal(updatedCampaigns);
                    }
                  }}
                />
              </div>
            );
          });
        }
        return null;
      })}
    </Paper>
  );
}
