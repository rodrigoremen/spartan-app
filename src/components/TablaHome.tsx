'use client'
import React, { useState, useMemo } from 'react';
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Table, Input, Pagination, Button, TableHeader, TableBody, TableRow, TableCell, TableColumn, Tooltip, Chip } from '@nextui-org/react';
import { users, columns } from './data/TablaHome';

export default function ProjectsTable() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredUsers]);
  return (
    <div>
      <Input
        isClearable
        placeholder='Buscar...'
        value={query}
        className='mb-4'
        onChange={(e) => setQuery(e.target.value)}
      />
      <Table>
        <TableHeader>
          {columns.map(col => (
            <TableColumn key={col.uid}>{col.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.project}</TableCell>
              <TableCell>{user.start}</TableCell>
              <TableCell>{user.end}</TableCell>
              <TableCell>
                <Chip className="capitalize" color="warning" size="sm" variant="flat">
                  {user.status}
                </Chip>
              </TableCell>
              <TableCell>{user.person}</TableCell>
              <TableCell>
                <Tooltip content="Ver proyecto">
                  <span className="text-lg flex justify-center cursor-pointer active:opacity-50">
                    <EyeOpenIcon />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredUsers.length > itemsPerPage && (
        <Pagination
          className='text-white mt-2'
          color='warning'
          variant='faded'
          total={Math.ceil(filteredUsers.length / itemsPerPage)}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
