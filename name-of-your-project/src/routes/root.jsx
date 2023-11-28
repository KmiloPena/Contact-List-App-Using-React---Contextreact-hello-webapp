import { Outlet, 
         NavLink, 
         Link,  
         useLoaderData, 
         Form,  
         redirect, 
         useNavigation,
         useOutlet, 
         useSubmit, 
        } from "react-router-dom";
import { getContacts, createContact, updateContact } from "../contacts";
import Contact from "./contact";

//import { useEffect } from "react";



export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, /* q */};
  }

export default function Root() {
const { contacts, /* q */ } = useLoaderData();
 const navigation = useNavigation();
  const submit = useSubmit();

  // const searching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has(
  //     "q"
  //   );

  // useEffect(() => {
  //   document.getElementById("q").value = q;
  // }, [q]);
 
    
    return (

      <>
       
          <nav className="navbar navbar-light bg-light mb-3">
              <Form method="post">
                 <button  type="submit">Add new contact</button>
              </Form>
             
          </nav>
          

          <div className="container">
          <ul className="list-group">
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>

                  

                   <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  > 
                  
                  </NavLink>
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>
        
      <div>
        <h1>
          {contact.first || contact.phone ? (
            <>
              {contact.first} {contact.phone}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          {/* <Favorite contact={contact} /> */}
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <NavLink to={contact.id}>
            
           <Form 
           action="edit"
           method="get">
           <button type="submit" >Edit</button> 
           </Form>  
           </NavLink>

           <NavLink to={`contacts/${contact.id}`}>
            <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            
              <button type="submit">Delete</button> 
              </Form>
            </NavLink>
        </div>
      </div>


                    <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.phone ? (
                      
                      <>
                        {/* {contact.first} {contact.phone} */}
                      </>
                      
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  
                  </Link>
                  {/* </NavLink> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
          </ul> 
          </div>

            
        <div 
          id="detail"
          className={
            navigation.state === "loading" ? "loading" : ""
          }
          >
           <Outlet /> 
        </div> 
      </>
    );
   }