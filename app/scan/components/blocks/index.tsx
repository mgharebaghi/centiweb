"use client";
import { Block, BlocksScan } from "@/app/api/types/types";
import { Pagination, Typography } from "@mui/material";
import { Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";

export default function ScanedBlocks() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<BlocksScan[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const fillDataSource = async () => {
    setLoading(true);
    setDataSource([]);
    await fetch("/api/blockscan", {
      method: "POST",
      body: JSON.stringify({ page: page }),
      cache: "no-store"
    }).then((res) => {
      if (!res.ok) {
        setLoading(false);
        console.log("err from server");
      } else {
        res.json().then(async (data) => {
          if (data.status === "success") {
            setLoading(false);
            if (page === 1) {
              setCount(Number(data.blocks[0].header.number / 10) + 1);
            }
            data.blocks.map((block: Block) => {
              let blockDate = moment.utc(block.header.date);
              let now = moment.now();
              let age = moment.duration(blockDate.diff(now));
              setDataSource((prevData) => [
                ...prevData,
                {
                  bn: (
                    <Typography
                      fontSize={12}
                      fontWeight="bold"
                      className="text-slate-700"
                    >
                      {block.header.number.toString()}
                    </Typography>
                  ),
                  hash: (
                    <>
                      <Typography fontSize={12} className="text-slate-700">
                        {block.header.blockhash}
                      </Typography>
                      <Typography fontSize={11} className="text-slate-400">
                        {age.humanize() + " ago"}
                      </Typography>
                    </>
                  ),
                  transactions: (
                    <Typography fontSize={12} className="text-slate-700">
                      {block.body.coinbase.block_len.toString()}
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
            className="mb-3 w-full shadow-sm min-h-[750px]"
            scroll={{ x: 1 }}
          >
            <ColumnGroup
              title="Blockchain Scan"
              className="text-xl text-slate-600"
            >
              <Column title="BN" dataIndex="bn" key="bn" />
              <Column title="Hash" dataIndex="hash" key="hash" />
              <Column title="Transactions" dataIndex="transactions" key="bn" />
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
