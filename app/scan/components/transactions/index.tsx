"use client";
import { Transaction, TrxScan } from "@/app/api/types/types";
import { Pagination, Typography } from "@mui/material";
import { Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { PulseLoader, SyncLoader } from "react-spinners";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";

export default function ScanedTrx() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<TrxScan[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const fillDataSource = async () => {
    setLoading(true);
    setDataSource([]);
    await fetch("/api/trxscan", {
      method: "POST",
      body: JSON.stringify({ page: page }),
    }).then((res) => {
      if (!res.ok) {
        setLoading(false);
        console.log("err from server");
      } else {
        res.json().then(async (data) => {
          if (data.status === "success") {
            setLoading(false);
            if (page === 1) {
              setCount(Number(data.count / 10));
            }
            data.trxs.map((trx: Transaction) => {
              let trxDate = moment.utc(trx.date);
              let now = moment.now();
              let age = moment.duration(trxDate.diff(now));
              setDataSource((prevData: any) => [
                ...prevData,
                {
                  from: (
                    <>
                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        className="text-slate-700"
                      >
                        {trx.from}
                      </Typography>
                      <Typography fontSize={11} className="text-slate-400">
                        {age.humanize() + " ago"}
                      </Typography>
                    </>
                  ),
                  to: (
                    <Typography fontSize={12} className="text-slate-700">
                      {trx.to}
                    </Typography>
                  ),
                  value: (
                    <Typography fontSize={12} className="text-slate-700">
                      {Number(trx.value)}
                    </Typography>
                  ),
                  status: (
                    <Typography fontSize={12} className="text-slate-700">
                      {trx.status}
                    </Typography>
                  ),
                },
              ]);
            });
          } else {
            setLoading(false);
            console.log(data.status);
          }
        });
      }
    });
  };

  useEffect(() => {
    fillDataSource();
  }, [page]);

  const handlePagination = (event: any, pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <div className="w-full min-h-[500px] text-center content-center">
      {!loading ? (
        <div className="w-full">
          <Table
            dataSource={dataSource}
            pagination={false}
            className="mb-3 w-full shadow-sm min-h-[500px]"
            scroll={{ x: 1 }}
          >
            <ColumnGroup
              title="Transactions Scan"
              className="text-xl text-slate-600"
            >
              <Column title="From" dataIndex="from" key="from" />
              <Column title="To" dataIndex="to" key="to" />
              <Column title="Value" dataIndex="value" key="value" />
              <Column title="Status" dataIndex="status" key="status" />
            </ColumnGroup>
          </Table>
          <div className="w-full grid justify-center">
            <Pagination
              page={page}
              count={Number(count.toFixed())}
              className="w-full"
              onChange={handlePagination}
              size="large"
            />
          </div>
        </div>
      ) : (
        <SyncLoader size={5} color="gray" />
      )}
    </div>
  );
}
