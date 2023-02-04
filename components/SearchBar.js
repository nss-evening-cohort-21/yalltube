import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Form, FormControl, InputGroup,
} from 'react-bootstrap';
import searchIcon from '../public/images/searchWhite.png';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
    setSearchInput('');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="m-auto">
        <FormControl
          className="search-form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={searchInput}
        />
        <button type="submit" className="search-btn" id="button-addon2">
          <Image src={searchIcon} alt="search icon" height={20} width={20} />
        </button>
      </InputGroup>
    </Form>
  );
}
