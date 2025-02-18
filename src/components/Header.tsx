"use client";

import type React from "react";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../store/authSlice";
import { Button } from "../components/ui/button";

const Header: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Web3 Cannabis
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-800"
              >
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-600 hover:text-gray-800">
                Cart
              </Link>
            </li>
            {auth.isAuthenticated ? (
              <>
                <li>
                  <span className="text-gray-600">
                    Welcome, {auth.username}
                  </span>
                </li>
                <li>
                  <Button onClick={() => dispatch(logout())} variant="outline">
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <Button variant="outline">Register</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
