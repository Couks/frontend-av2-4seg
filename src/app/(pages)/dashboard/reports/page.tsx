// src/app/dashboard/reports/page.tsx
import React from "react";

const Reports = () => {
  const reportsData = [
    { id: 1, title: "Relatório de Vendas - Setembro 2024", date: "2024-09-30" },
    { id: 2, title: "Análise de Desempenho - Q3 2024", date: "2024-09-25" },
    {
      id: 3,
      title: "Relatório de Satisfação do Cliente - Agosto 2024",
      date: "2024-08-31",
    },
    { id: 4, title: "Relatório Financeiro - 2024", date: "2024-12-31" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Relatórios</h2>
      <ul className="list-disc pl-5">
        {reportsData.map((report) => (
          <li key={report.id} className="mb-2">
            <a href="#" className="text-blue-600 hover:underline">
              {report.title}
            </a>
            <span className="ml-2 text-gray-500">({report.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
