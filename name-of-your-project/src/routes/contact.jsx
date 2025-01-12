import { Form, useLoaderData, /*useFetcher,*/ } from "react-router-dom";
import { getContact, updateContact } from "../contacts";



export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  const { contact } = useLoaderData();
  
  
 return (
  
  <div className="ListGroup">


    <div id="contact">
     
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
          <Form action="edit">
           {/* <i type="submit" class="bi bi-pencil"></i> */}
          <button type="submit" >Edit</button> 
          </Form>
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
            {/* <i type="submit" class="bi bi-trash"></i> */}
             <button type="submit">Delete</button> 
          </Form>
        </div>
      </div>
    </div>
    </div>
  
 );
}

 function Favorite({ contact }) {
   // yes, this is a `let` for later
   const fetcher = useFetcher();
   let favorite = contact.favorite;
   if (fetcher.formData) {
     favorite = fetcher.formData.get("favorite") === "true";
   }
   return (
     <fetcher.Form method="post">
       <button
         name="favorite"
         value={favorite ? "false" : "true"}
         aria-label={
           favorite
             ? "Remove from favorites"
             : "Add to favorites"
         }
       >
         {favorite ? "★" : "☆"}
       </button>
     </fetcher.Form>
   );
 }