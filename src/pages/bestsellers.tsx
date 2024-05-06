import Layout from "@/components/Layout"
import { BEST_SELLERS } from "@/graphql/querys";
import { ISellerGraphics } from "@/models";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const BestSellers = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_SELLERS)

    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return 'Loading'
    const { getBestSellers } = data
    const sellerGraphics: ISellerGraphics[] = [];
    getBestSellers.map((seller: ISellerGraphics, index: number) => {
        if (!seller.seller) return
        sellerGraphics[index] = {
            ...seller.seller[0],
            total: seller.total
        }
    })
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Best Sellers</h1>
            <BarChart
                className="mt-10"
                width={600}
                height={500}
                data={sellerGraphics}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3182CE" />
            </BarChart>
        </Layout>
    )
}

export default BestSellers
