import { Avatar, Dropdown, Navbar as NavbarReact } from "flowbite-react";

export default function Navbar() {
  return (
    <NavbarReact fluid rounded>
      <NavbarReact.Brand href="https://flowbite-react.com">
        <img
          src="/Ymedia.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NavbarReact.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <NavbarReact.Toggle />
      </div>
      <NavbarReact.Collapse>
        <NavbarReact.Link href="#" active>
          Home
        </NavbarReact.Link>
        <NavbarReact.Link href="#">About</NavbarReact.Link>
        <NavbarReact.Link href="#">Services</NavbarReact.Link>
        <NavbarReact.Link href="#">Pricing</NavbarReact.Link>
        <NavbarReact.Link href="#">Contact</NavbarReact.Link>
      </NavbarReact.Collapse>
    </NavbarReact>
  );
}
