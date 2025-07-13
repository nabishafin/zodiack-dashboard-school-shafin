import React from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const currentGroupData = [
  {
    id: "584548",
    userName: "Jane Cooper",
    email: "abc@email.com",
    address: "United Kingdom",
  },
  {
    id: "584549",
    userName: "John Doe",
    email: "john@email.com",
    address: "United States",
  },
  {
    id: "584550",
    userName: "Alice Smith",
    email: "alice@email.com",
    address: "Canada",
  },
  {
    id: "584551",
    userName: "Bob Johnson",
    email: "bob@email.com",
    address: "Australia",
  },
  {
    id: "584552",
    userName: "Charlie Brown",
    email: "charlie@email.com",
    address: "Germany",
  },
  {
    id: "584553",
    userName: "Diana Prince",
    email: "diana@email.com",
    address: "France",
  },
  {
    id: "584554",
    userName: "Eve Adams",
    email: "eve@email.com",
    address: "Japan",
  },
  {
    id: "584555",
    userName: "Frank White",
    email: "frank@email.com",
    address: "Brazil",
  },
  {
    id: "584556",
    userName: "Grace Lee",
    email: "grace@email.com",
    address: "South Korea",
  },
  {
    id: "584557",
    userName: "Henry King",
    email: "henry@email.com",
    address: "India",
  },
];

const historyData = [
  {
    id: "584500",
    userName: "Old User 1",
    email: "old1@email.com",
    address: "China",
  },
  {
    id: "584501",
    userName: "Old User 2",
    email: "old2@email.com",
    address: "Russia",
  },
  {
    id: "584502",
    userName: "Old User 3",
    email: "old3@email.com",
    address: "Mexico",
  },
];

const ITEMS_PER_PAGE = 8;

export default function AllGroups() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("current-group");
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const currentDataSource =
    activeTab === "current-group" ? currentGroupData : historyData;

  const filteredData = currentDataSource.filter(
    (item) =>
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="bg-[#2C6E3E] text-white p-5 rounded-sm shadow-none border-none">
        <h1 className="text-2xl font-bold">All Group</h1>
      </div>
      <div>
        <Card className="w-full mt-5 mx-auto  overflow-hidden rounded-none">
          <CardContent className="p-0">
            <Tabs
              defaultValue="current-group"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b gap-4">
                <TabsList className="grid w-full sm:w-[300px] grid-cols-2 h-auto bg-transparent p-0">
                  <TabsTrigger
                    value="current-group"
                    className={cn(
                      "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      activeTab === "current-group"
                        ? "!bg-[#2C6E3E] text-white shadow-sm"
                        : "bg-white text-gray-700"
                    )}
                  >
                    Current Group ({currentGroupData.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className={cn(
                      "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      activeTab === "history"
                        ? "!bg-[#2C6E3E] text-white shadow-sm"
                        : "bg-white text-gray-700"
                    )}
                  >
                    History ({historyData.length})
                  </TabsTrigger>
                </TabsList>
                <div className="relative w-full sm:w-64">
                  <Input
                    type="text"
                    placeholder="Name or ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-[#2C6E3E] focus:border-[#2C6E3E]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <TabsContent value="current-group" className="p-4 mt-0">
                <DataTable data={paginatedData} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </TabsContent>
              <TabsContent value="history" className="p-4 mt-0">
                <DataTable data={paginatedData} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DataTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#2C6E3E] hover:bg-[#2C6E3E]">
            <TableHead className="text-white text-center w-20">ID</TableHead>
            <TableHead className="text-white text-center">User Name</TableHead>
            <TableHead className="text-white text-center">Email</TableHead>
            <TableHead className="text-white text-center">Address</TableHead>
            <TableHead className="text-white text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="text-center">{item.userName}</TableCell>
                <TableCell className="text-center">{item.email}</TableCell>
                <TableCell className="text-center">{item.address}</TableCell>
                <TableCell className="text-center">
                  <Link to={`/dashboard/groupsdetails/${item.id}`}>
                    <Button className="bg-[#2C6E3E] text-white hover:bg-[#2C6E3E]/90">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(
        totalPages,
        currentPage + Math.floor(maxPagesToShow / 2)
      );

      if (endPage - startPage + 1 < maxPagesToShow) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        } else if (endPage === totalPages) {
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((page, index) =>
      page === "..." ? (
        <span
          key={`ellipsis-${index}`}
          className="px-2 py-1 text-sm text-gray-500"
        >
          <MoreHorizontal className="h-4 w-4" />
        </span>
      ) : (
        <Button
          key={page}
          variant="outline"
          size="icon"
          className={cn(
            "h-8 w-8 border border-gray-300",
            currentPage === page
              ? "bg-[#2C6E3E] text-white hover:bg-[#2C6E3E]/90"
              : "bg-white text-gray-700 hover:bg-gray-100"
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      )
    );
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-[#2C6E3E] text-white hover:bg-[#2C6E3E]/90 border border-[#2C6E3E]"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back
      </Button>
      {renderPageNumbers()}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="bg-[#2C6E3E] text-white hover:bg-[#2C6E3E]/90 border border-[#2C6E3E]"
      >
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
