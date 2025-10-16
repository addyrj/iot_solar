const db = require("../../DB/config");
const solarcharger = db.solarCharger;
const { Op } = require("sequelize");

// --------------------- Create Solar Charger ---------------------
const createSolarCharger = async (req, res) => {
  try {
    console.log('Received payload:', JSON.stringify(req.body, null, 2));

    const { UID, data = [] } = req.body;

    if (!UID || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "UID and data array are required",
      });
    }

    const roundToSecond = (date) =>
      new Date(Math.floor(new Date(date).getTime() / 1000) * 1000);

    const validateValue = (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num <= 30 ? num : 0;
    };

    const dataArray = data.map((item) => ({
      Location: UID,
      UID,
      PvVolt: item.PvVolt ? validateValue(item.PvVolt) : null,
      PvCur: item.PvCur ? validateValue(item.PvCur) : null,
      BatVoltage: item.BatVoltage ? validateValue(item.BatVoltage) : null,
      BatCurrent: item.BatCurrent ? validateValue(item.BatCurrent) : null,
      LoadVoltage: item.LoadVoltage ? validateValue(item.LoadVoltage) : null,
      LoadCurrent: item.LoadCurrent ? validateValue(item.LoadCurrent) : null,
      BatKWh: item.BatKWh ? validateValue(item.BatKWh) : null,
      PVKWh: item.PVKWh ? validateValue(item.PVKWh) : null,
      Temperature: item.Temperature ? parseFloat(item.Temperature) : null,
      RecordTime: roundToSecond(item.RecordTime),
      Time: new Date(),
      IP: item.IP || req.ip || "Not Set",
    }));

    // Avoid duplicate RecordTime
    const recordTimesToCheck = dataArray.map(d => d.RecordTime);
    const existingRecords = await solarcharger.findAll({
      where: {
        UID,
        RecordTime: { [Op.in]: recordTimesToCheck }
      },
      attributes: ["RecordTime"]
    });

    const existingTimes = new Set(
      existingRecords.map(r => roundToSecond(r.RecordTime).toISOString())
    );

    const filteredDataArray = dataArray.filter(
      d => !existingTimes.has(roundToSecond(d.RecordTime).toISOString())
    );

    if (filteredDataArray.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No new records to insert. All entries already exist.",
        inserted: 0,
        data: [],
      });
    }

    const insertedData = await solarcharger.bulkCreate(filteredDataArray, { returning: true });

    return res.status(200).json({
      status: 200,
      message: "Solar charger data inserted successfully",
      inserted: insertedData.length,
      data: insertedData,
    });

  } catch (error) {
    console.error("Error inserting solar charger data:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// --------------------- Get All Solar Charger ---------------------
const getAllSolarCharger = async (req, res) => {
  try {
    const allChargerData = await solarcharger.findAll();

    if (!allChargerData || allChargerData.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No solar charger data found'
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Solar charger data fetched successfully',
      count: allChargerData.length,
      info: allChargerData.map(item => ({
        ID: item.ID,
        Location: item.Location,
        UID: item.UID,
        BatVoltage: item.BatVoltage,
        BatCurrent: item.BatCurrent,
        PvVolt: item.PvVolt,
        PvCur: item.PvCur,
        LoadVoltage: item.LoadVoltage,
        LoadCurrent: item.LoadCurrent,
        BatKWh: item.BatKWh,
        PVKWh: item.PVKWh,
        Temperature: item.Temperature,
        Time: item.Time,
        RecordTime: item.RecordTime,
        IP: item.IP
      }))
    });

  } catch (error) {
    console.error("Error fetching solar charger data:", error);
    return res.status(500).json({
      status: 500,
      error: true,
      message: error.message || 'Internal Server Error'
    });
  }
};

// --------------------- Get Solar Charger By ID ---------------------
const getSolarChargerById = async (req, res) => {
  try {
    const { id } = req.params;

    const chargerData = await solarcharger.findOne({ where: { ID: id } });

    if (!chargerData) {
      return res.status(404).json({
        status: 404,
        message: "Device not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Solar charger data fetched successfully",
      data: {
        ID: chargerData.ID,
        UID: chargerData.UID,
        Location: chargerData.Location,
        PvVolt: chargerData.PvVolt,
        PvCur: chargerData.PvCur,
        BatVoltage: chargerData.BatVoltage,
        BatCurrent: chargerData.BatCurrent,
        LoadVoltage: chargerData.LoadVoltage,
        LoadCurrent: chargerData.LoadCurrent,
        BatKWh: chargerData.BatKWh,
        PVKWh: chargerData.PVKWh,
        Temperature: chargerData.Temperature,
        Time: chargerData.Time,
        RecordTime: chargerData.RecordTime,
        IP: chargerData.IP
      }
    });
  } catch (error) {
    console.error("Error fetching solar charger by ID:", error);
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = { createSolarCharger, getAllSolarCharger, getSolarChargerById };
