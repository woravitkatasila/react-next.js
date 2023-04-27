interface Nav {
  key: string
  path: string
}
interface NavbarObj extends Nav {
  subItems?: Array<Nav>
}

export type StaticNavbars = Array<Nav>
export type Navbars = Array<NavbarObj>
