import { Form, useLoaderData,  redirect, useNavigate,} from "react-router-dom";
import { updateContact } from "../contacts";


export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <label>
        <span>Full Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        </label>
        <label>
        <span>Phone</span>
        <input
          placeholder="Phone"
          aria-label="Phone"
          type="number"
          name="phone"
          defaultValue={contact.phone}
        />
        </label>
        <label>
        <span>Email</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Address</span>
        <input
          name="notes"
          defaultValue={contact.address}
        />
      </label>
      <div class="d-grid gap-2">
      <p>
        <button type="submit">Save</button>
      </p>
      </div>
      <div class="d-grid gap-2">
      <p>
      <button type="button" 
           onClick={() => {
            navigate(-1);
           }}
        >
          Cancel
        </button>
      </p>
      </div>
    </Form>
  );
}